"use client";

import { Box, Container, Typography } from "@mui/material";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Link from "next/link";
import { motion } from "framer-motion";

type Place = {
  name: string;
  description: string;
  latitude?: number;
  longitude?: number;
  detail: {
    location: string;
  };
};

type MapSectionProps = {
  places: Place[];
};

export default function MapSection({ places }: MapSectionProps) {
  const center = [13.6, 75.4] as [number, number];

  return (
    <Box className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <Typography variant="h3" className="font-bold text-orange-800 mb-4">
            Explore Malenaadu on the Map
          </Typography>
          <Typography className="text-gray-600 max-w-2xl mx-auto">
            Discover the region visually with an interactive map powered by OpenStreetMap.
            Click any marker to view place details and start planning your journey.
          </Typography>
        </motion.div>

        <Box
          className="rounded-3xl overflow-hidden shadow-2xl"
          sx={{ border: "1px solid #E2E8F0" }}
        >
          <MapContainer center={center} zoom={8} scrollWheelZoom style={{ width: "100%", minHeight: 520 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.map((place) => {
              const lat = place.latitude;
              const lng = place.longitude;

              if (typeof lat !== "number" || typeof lng !== "number") {
                return null;
              }

              return (
                <CircleMarker
                  key={place.name}
                  center={[lat, lng]}
                  radius={9}
                  pathOptions={{ color: "#EF6C00", fillColor: "#FBBF24", fillOpacity: 0.95 }}
                >
                  <Popup>
                    <Box>
                      <Typography variant="subtitle1" className="font-semibold text-orange-700 mb-1">
                        {place.name}
                      </Typography>
                      <Typography variant="body2" className="text-gray-700 mb-2">
                        {place.description}
                      </Typography>
                      <Link href={`/place/${encodeURIComponent(place.name)}`} style={{ color: "#EF6C00", fontWeight: 600 }}>
                        View Details
                      </Link>
                    </Box>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </Box>
      </Container>
    </Box>
  );
}
