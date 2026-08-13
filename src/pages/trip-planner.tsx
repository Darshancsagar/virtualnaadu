import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MapIcon from "@mui/icons-material/Map";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { topPlacesToVisit } from "@/data/topPlacesToVisit";
import Footer from "@/components/Footer";

type Place = {
  name: string;
  description: string;
  tags: string[];
  latitude: number;
  longitude: number;
};

type StartCity = { name: string; latitude: number; longitude: number };

const START_CITIES: StartCity[] = [
  { name: "Bengaluru", latitude: 12.9716, longitude: 77.5946 },
  { name: "Mysuru", latitude: 12.2958, longitude: 76.6394 },
  { name: "Mangaluru", latitude: 12.9141, longitude: 74.856 },
  { name: "Shivamogga", latitude: 13.9299, longitude: 75.5681 },
];

const STORAGE_KEY = "malenaadu-trip-plan";

function distanceKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const rad = (value: number) => (value * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const value = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

export default function TripPlanner() {
  const places = topPlacesToVisit as Place[];
  const [days, setDays] = useState(2);
  const [startCity, setStartCity] = useState("Bengaluru");
  const [travelMode, setTravelMode] = useState("Driving");
  const [interests, setInterests] = useState<string[]>(["nature"]);
  const [itinerary, setItinerary] = useState<Place[]>([]);
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState<Record<string, string>>({});

  const tags = useMemo(() => Array.from(new Set(places.flatMap((place) => place.tags))).sort(), [places]);
  const selectedStart = START_CITIES.find((city) => city.name === startCity) ?? START_CITIES[0];

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const plan = JSON.parse(saved);
        setDays(plan.days ?? 2);
        setStartCity(plan.startCity ?? "Bengaluru");
        setTravelMode(plan.travelMode ?? "Driving");
        setInterests(plan.interests ?? ["nature"]);
        setItinerary(places.filter((place) => (plan.placeNames ?? []).includes(place.name)));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    const sharedPlan = new URLSearchParams(window.location.search).get("plan");
    if (sharedPlan) {
      const sharedNames = sharedPlan.split(",").map(decodeURIComponent);
      setItinerary(places.filter((place) => sharedNames.includes(place.name)));
      setMessage("Shared itinerary loaded. Save it to keep it on this device.");
    }
  }, [places]);

  useEffect(() => {
    if (!itinerary.length) return;
    let cancelled = false;
    Promise.all(itinerary.map(async (place) => {
      try {
        const response = await fetch(`/api/weather?lat=${place.latitude}&lon=${place.longitude}`);
        const data = await response.json();
        return [place.name, `${Math.round(data.current.temperature_2m)}°C · ${data.current.precipitation > 0 ? "Rain possible" : "Dry now"}`] as const;
      } catch {
        return [place.name, "Forecast unavailable"] as const;
      }
    })).then((results) => {
      if (!cancelled) setWeather(Object.fromEntries(results));
    });
    return () => { cancelled = true; };
  }, [itinerary]);

  const buildItinerary = () => {
    const targetCount = Math.min(places.length, Math.max(days * 2, 2));
    const ranked = [...places].sort((a, b) => {
      const aScore = a.tags.filter((tag) => interests.includes(tag)).length;
      const bScore = b.tags.filter((tag) => interests.includes(tag)).length;
      return bScore - aScore || distanceKm(selectedStart, a) - distanceKm(selectedStart, b);
    });
    const candidates = ranked.slice(0, targetCount);
    const route: Place[] = [];
    let current: { latitude: number; longitude: number } = selectedStart;
    while (candidates.length) {
      const nextIndex = candidates.reduce((best, place, index) =>
        distanceKm(current, place) < distanceKm(current, candidates[best]) ? index : best, 0);
      const next = candidates.splice(nextIndex, 1)[0];
      route.push(next);
      current = next;
    }
    setItinerary(route);
  };

  const savePlan = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ days, startCity, travelMode, interests, placeNames: itinerary.map((place) => place.name) }));
    setMessage("Trip saved on this device.");
  };

  const removePlace = (name: string) => setItinerary((current) => current.filter((place) => place.name !== name));
  const movePlace = (index: number, direction: -1 | 1) => {
    setItinerary((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const updated = [...current];
      [updated[index], updated[target]] = [updated[target], updated[index]];
      return updated;
    });
  };

  const totalDistance = itinerary.reduce((total, place, index) => total + distanceKm(index === 0 ? selectedStart : itinerary[index - 1], place), 0);
  const routeUrl = itinerary.length
    ? `https://www.google.com/maps/dir/?api=1&origin=${selectedStart.latitude},${selectedStart.longitude}&destination=${itinerary[itinerary.length - 1].latitude},${itinerary[itinerary.length - 1].longitude}&travelmode=${travelMode === "Driving" ? "driving" : "transit"}&waypoints=${itinerary.slice(0, -1).map((place) => `${place.latitude},${place.longitude}`).join("|")}`
    : "";
  const shareUrl = typeof window === "undefined" ? "" : `${window.location.origin}/trip-planner?plan=${itinerary.map((place) => encodeURIComponent(place.name)).join(",")}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`My ${days}-day Malenaadu trip: ${itinerary.map((place) => place.name).join(" → ")}\n${shareUrl}`)}`;
  const dayPlans = Array.from({ length: days }, (_, index) => itinerary.slice(Math.floor((index * itinerary.length) / days), Math.floor(((index + 1) * itinerary.length) / days)));

  return (
    <>
      <Head><title>Trip Planner | Malenaadu</title><meta name="description" content="Build a personalised Malenaadu itinerary with routes, weather and directions." /></Head>
      <Box sx={{ background: "linear-gradient(180deg, #f1f8e9 0%, #fff 45%)", minHeight: "100vh", py: { xs: 5, md: 8 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={5}>
            <Typography component="h1" variant="h3" fontWeight={800} color="#1B5E20">Plan your Malenaadu trip</Typography>
            <Typography color="text.secondary" mt={1}>Choose what you enjoy and get a practical day-by-day route. Your plan stays in this browser.</Typography>
          </Box>
          <Card sx={{ mb: 5, borderRadius: 3 }}><CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={3}><FormControl fullWidth><InputLabel>Trip length</InputLabel><Select label="Trip length" value={days} onChange={(event) => setDays(Number(event.target.value))}>{[1, 2, 3, 4, 5].map((value) => <MenuItem key={value} value={value}>{value} day{value > 1 ? "s" : ""}</MenuItem>)}</Select></FormControl></Grid>
              <Grid item xs={12} sm={6} md={3}><FormControl fullWidth><InputLabel>Starting city</InputLabel><Select label="Starting city" value={startCity} onChange={(event) => setStartCity(String(event.target.value))}>{START_CITIES.map((city) => <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>)}</Select></FormControl></Grid>
              <Grid item xs={12} sm={6} md={3}><FormControl fullWidth><InputLabel>Travel mode</InputLabel><Select label="Travel mode" value={travelMode} onChange={(event) => setTravelMode(String(event.target.value))}><MenuItem value="Driving">Driving</MenuItem><MenuItem value="Transit">Public transport</MenuItem></Select></FormControl></Grid>
              <Grid item xs={12} sm={6} md={3}><Button fullWidth size="large" variant="contained" onClick={buildItinerary} startIcon={<DirectionsCarIcon />} sx={{ height: 56, backgroundColor: "#2E7D32", "&:hover": { backgroundColor: "#1B5E20" } }}>Build itinerary</Button></Grid>
              <Grid item xs={12}><Typography variant="subtitle2" mb={1}>What interests you?</Typography><Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">{tags.map((tag) => <Chip key={tag} label={tag} clickable color={interests.includes(tag) ? "success" : "default"} onClick={() => setInterests((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])} />)}</Stack></Grid>
            </Grid>
          </CardContent></Card>
          {itinerary.length === 0 ? <Alert severity="info">Choose your preferences, then select <strong>Build itinerary</strong> to create your trip.</Alert> : <>
            <Box display="flex" flexWrap="wrap" gap={2} justifyContent="space-between" alignItems="center" mb={3}><Typography variant="h5" fontWeight={700}>Your route: about {Math.round(totalDistance)} km · {Math.round(totalDistance / 45)} hours driving</Typography><Stack direction="row" spacing={1} flexWrap="wrap"><Button onClick={savePlan}>Save plan</Button><Button component="a" href={routeUrl} target="_blank" startIcon={<MapIcon />}>Open route</Button><Button component="a" href={whatsappUrl} target="_blank" startIcon={<WhatsAppIcon />}>WhatsApp</Button><Button onClick={() => navigator.clipboard.writeText(shareUrl).then(() => setMessage("Share link copied."))} startIcon={<ShareIcon />}>Copy link</Button></Stack></Box>
            <Grid container spacing={3}>{dayPlans.map((day, dayIndex) => <Grid item xs={12} md={days > 2 ? 6 : 12} key={dayIndex}><Card sx={{ height: "100%", borderRadius: 3, borderTop: "4px solid #2E7D32" }}><CardContent><Typography variant="h6" fontWeight={700} mb={2}>Day {dayIndex + 1}</Typography>{day.length === 0 ? <Typography color="text.secondary">Keep this day flexible.</Typography> : <Stack spacing={2}>{day.map((place) => { const index = itinerary.findIndex((item) => item.name === place.name); return <Box key={place.name} sx={{ borderLeft: "2px solid #a5d6a7", pl: 2 }}><Box display="flex" justifyContent="space-between" gap={1}><Link href={`/place/${encodeURIComponent(place.name)}`}><Typography fontWeight={700} color="#1B5E20">{place.name}</Typography></Link><Box><Button size="small" disabled={index === 0} onClick={() => movePlace(index, -1)}>↑</Button><Button size="small" disabled={index === itinerary.length - 1} onClick={() => movePlace(index, 1)}>↓</Button><Button size="small" color="error" aria-label={`Remove ${place.name}`} onClick={() => removePlace(place.name)}><DeleteOutlineIcon fontSize="small" /></Button></Box></Box><Typography variant="body2" color="text.secondary">{place.description}</Typography><Typography variant="caption" color="text.secondary">Weather: {weather[place.name] ?? "Loading forecast…"} · <Link href={`/place/${encodeURIComponent(place.name)}`}>full forecast</Link></Typography></Box>; })}</Stack>}</CardContent></Card></Grid>)}</Grid>
          </>}
        </Container>
      </Box>
      <Footer />
      <Snackbar open={Boolean(message)} autoHideDuration={3500} onClose={() => setMessage("")}><Alert severity="success" onClose={() => setMessage("")}>{message}</Alert></Snackbar>
    </>
  );
}
