import { useRouter } from "next/router";
import Head from "next/head";
import Script from "next/script";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Paper,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { topPlacesToVisit } from "@/data/topPlacesToVisit";
import { touristAttractionSchema, breadcrumbSchema } from "@/utils/schemas";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DirectionsIcon from "@mui/icons-material/Directions";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import HotelIcon from "@mui/icons-material/Hotel";
import AttractionsIcon from "@mui/icons-material/Attractions";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RoomIcon from "@mui/icons-material/Room";

export default function PlaceDetail() {
  const router = useRouter();
  const { name } = router.query;

  const place = topPlacesToVisit.find((p) => p.name === name);

  if (!place) {
    return (
      <Container className="py-16 text-center">
        <Typography variant="h4" className="text-red-600">
          Place not found
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#A5D6A7", color: "#1B5E20", mt: 2 }}
          onClick={() => router.push("/")}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const detail = place.detail as {
    location: string;
    bestTimeToVisit: string;
    howToReach: string;
    highlights: string[];
    attractions: string;
    accommodation: string;
    entryFee: string;
    activities: string;
  };

  const touristSchema = touristAttractionSchema({
    name: place.name,
    description: place.description,
    image: place.image,
    location: detail.location,
    url: `https://www.virtualnaadu.com/place/${place.name}`,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.virtualnaadu.com" },
    { name: "Places", url: "https://www.virtualnaadu.com/places" },
    { name: place.name, url: `https://www.virtualnaadu.com/place/${place.name}` },
  ]);

  const handleGetDirections = () => {
    const locationName = place.name.replace(/\s+/g, "+");
    const googleMapsUrl = `https://www.google.com/maps/search/${locationName}+Karnataka`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <Head>
        <title>{place.name} - Top Tourist Destination in Malenadu | Virtual Naadu</title>
        <Script
          id="tourist-attraction-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(touristSchema) }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
        <meta
          name="description"
          content={`${place.description} Explore attractions, best time to visit, how to reach, activities and accommodation options for ${place.name}.`}
        />
        <meta
          name="keywords"
          content={`${place.name}, tourist place, Malenadu, Karnataka, attraction, travel guide, accommodation, activities`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Virtual Naadu" />
        <meta property="og:title" content={`${place.name} - Virtual Naadu`} />
        <meta
          property="og:description"
          content={`Discover ${place.name} - ${place.description}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.virtualnaadu.com/place/${place.name}`} />
        <meta property="og:image" content={place.image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box className="bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Back Button */}
      <Box className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <Container className="py-3">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/")}
            sx={{
              color: "#2E7D32",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#E8F5E9",
              },
            }}
          >
            Back to Places
          </Button>
        </Container>
      </Box>

      {/* Hero Section with Image */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[70vh] w-full bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('${place.image}')`,
          backgroundAttachment: "fixed",
        }}
      >
        <Box className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <Box className="absolute inset-0 backdrop-blur-sm" style={{ backdropFilter: "blur(1px)" }} />
        
        <Box className="relative z-10 h-full flex items-end pb-12">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box className="mb-4 flex items-center gap-2">
                <RoomIcon sx={{ color: "#FFD700", fontSize: 32 }} />
                <Typography
                  variant="h3"
                  className="font-bold text-white drop-shadow-2xl text-4xl md:text-6xl"
                >
                  {place.name}
                </Typography>
              </Box>
              <Typography
                variant="h6"
                className="text-gray-100 mt-3 drop-shadow-lg max-w-2xl text-lg"
              >
                {place.description}
              </Typography>
            </motion.div>
          </Container>
        </Box>
      </Box>

      {/* Action Buttons Bar */}
      <Container className="relative z-40 -mt-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box className="flex flex-wrap gap-4 bg-white rounded-2xl shadow-2xl p-6 backdrop-blur-sm">
            <Button
              variant="contained"
              startIcon={<DirectionsIcon />}
              onClick={handleGetDirections}
              sx={{
                backgroundColor: "#2E7D32",
                color: "white",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                flex: { xs: "1 1 calc(50% - 8px)", md: "0 1 auto" },
                "&:hover": {
                  backgroundColor: "#1B5E20",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(30, 100, 25, 0.3)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Get Directions
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#2E7D32",
                color: "#2E7D32",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: 600,
                borderRadius: "12px",
                flex: { xs: "1 1 calc(50% - 8px)", md: "0 1 auto" },
                "&:hover": {
                  backgroundColor: "#E8F5E9",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Share
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Main Content */}
      <Container className="py-8">
        <Grid container spacing={4}>
          {/* Left Column - Key Information */}
          <Grid item xs={12} md={8}>
            {/* Quick Info Cards */}
            <Grid container spacing={3} className="mb-8">
              {/* Location */}
              <Grid item xs={12} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className="h-full hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500 cursor-pointer transform hover:scale-105"
                    sx={{
                      background: "linear-gradient(135deg, #F1F8E9 0%, #FFFFFF 100%)",
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Box className="flex items-start gap-3">
                        <Box
                          sx={{
                            backgroundColor: "#E8F5E9",
                            borderRadius: 2,
                            padding: 1,
                          }}
                        >
                          <LocationOnIcon
                            sx={{ color: "#2E7D32", fontSize: 28 }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            className="font-bold text-green-800"
                          >
                            Location
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-1"
                          >
                            {detail.location}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Best Time to Visit */}
              <Grid item xs={12} sm={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card
                    className="h-full hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500 cursor-pointer transform hover:scale-105"
                    sx={{
                      background: "linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)",
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Box className="flex items-start gap-3">
                        <Box
                          sx={{
                            backgroundColor: "#E3F2FD",
                            borderRadius: 2,
                            padding: 1,
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{ color: "#1565C0", fontSize: 28 }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            className="font-bold text-blue-800"
                          >
                            Best Time to Visit
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            className="mt-1"
                          >
                            {detail.bestTimeToVisit}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>

            {/* How to Reach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <Card
                className="hover:shadow-2xl transition-all duration-300 border-t-4 border-t-purple-500"
                sx={{
                  background: "linear-gradient(135deg, #F3E5F5 0%, #FFFFFF 100%)",
                }}
              >
                <CardContent>
                  <Box className="flex items-start gap-3">
                    <Box
                      sx={{
                        backgroundColor: "#F3E5F5",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <DirectionsIcon
                        sx={{ color: "#6A1B9A", fontSize: 28 }}
                      />
                    </Box>
                    <Box className="w-full">
                      <Typography
                        variant="h6"
                        className="font-bold text-purple-800 mb-2"
                      >
                        How to Reach
                      </Typography>
                      <Divider sx={{ mb: 2, backgroundColor: "#CE93D8" }} />
                      <Typography variant="body2" color="text.secondary">
                        {detail.howToReach}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <Card
                className="hover:shadow-2xl transition-all duration-300 border-t-4 border-t-yellow-500"
                sx={{
                  background: "linear-gradient(135deg, #FFFDE7 0%, #FFFFFF 100%)",
                }}
              >
                <CardContent>
                  <Box className="flex items-start gap-3">
                    <Box
                      sx={{
                        backgroundColor: "#FFFDE7",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <StarIcon sx={{ color: "#F57F17", fontSize: 28 }} />
                    </Box>
                    <Box className="w-full">
                      <Typography
                        variant="h6"
                        className="font-bold text-yellow-800 mb-3"
                      >
                        Highlights
                      </Typography>
                      <Box className="space-y-3">
                        {detail.highlights.map((highlight, idx) => (
                          <Box
                            key={idx}
                            className="flex items-start gap-3 p-3 bg-white/60 rounded-lg hover:bg-white transition-all"
                          >
                            <Box
                              className="text-yellow-600 font-bold min-w-fit text-lg"
                              sx={{ mt: 0.5 }}
                            >
                              ✓
                            </Box>
                            <Typography variant="body2" className="flex-1">
                              {highlight}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Attractions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <Card
                className="hover:shadow-2xl transition-all duration-300 border-t-4 border-t-orange-500"
                sx={{
                  background: "linear-gradient(135deg, #FFE0B2 0%, #FFFFFF 100%)",
                }}
              >
                <CardContent>
                  <Box className="flex items-start gap-3">
                    <Box
                      sx={{
                        backgroundColor: "#FFE0B2",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <AttractionsIcon
                        sx={{ color: "#E65100", fontSize: 28 }}
                      />
                    </Box>
                    <Box className="w-full">
                      <Typography
                        variant="h6"
                        className="font-bold text-orange-800 mb-2"
                      >
                        Attractions
                      </Typography>
                      <Divider sx={{ mb: 2, backgroundColor: "#FFCC80" }} />
                      <Typography variant="body2" color="text.secondary">
                        {detail.attractions}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <Card
                className="hover:shadow-2xl transition-all duration-300 border-t-4 border-t-red-500"
                sx={{
                  background: "linear-gradient(135deg, #FFEBEE 0%, #FFFFFF 100%)",
                }}
              >
                <CardContent>
                  <Box className="flex items-start gap-3">
                    <Box
                      sx={{
                        backgroundColor: "#FFEBEE",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <LocalActivityIcon
                        sx={{ color: "#C62828", fontSize: 28 }}
                      />
                    </Box>
                    <Box className="w-full">
                      <Typography
                        variant="h6"
                        className="font-bold text-red-800 mb-3"
                      >
                        Activities
                      </Typography>
                      <Box className="flex flex-wrap gap-2">
                        {detail.activities.split(",").map((activity, idx) => (
                          <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Chip
                              label={activity.trim()}
                              variant="filled"
                              sx={{
                                backgroundColor: "#FFCDD2",
                                color: "#C62828",
                                fontWeight: 600,
                                "&:hover": {
                                  backgroundColor: "#EF9A9A",
                                },
                              }}
                            />
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Right Column - Sidebar Information */}
          <Grid item xs={12} md={4}>
            {/* Accommodation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <Card
                className="hover:shadow-2xl transition-all duration-300 sticky top-24 border-t-4 border-t-cyan-500"
                sx={{
                  background: "linear-gradient(135deg, #E0F2F1 0%, #FFFFFF 100%)",
                }}
              >
                <CardContent>
                  <Box className="flex items-start gap-3">
                    <Box
                      sx={{
                        backgroundColor: "#E0F2F1",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <HotelIcon sx={{ color: "#00695C", fontSize: 28 }} />
                    </Box>
                    <Box className="w-full">
                      <Typography
                        variant="h6"
                        className="font-bold text-teal-800 mb-2"
                      >
                        Accommodation
                      </Typography>
                      <Divider sx={{ mb: 2, backgroundColor: "#80DEEA" }} />
                      <Typography variant="body2" color="text.secondary">
                        {detail.accommodation}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* Entry Fee */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <Card
                className="hover:shadow-2xl transition-all duration-300 border-t-4 border-t-indigo-500"
                sx={{
                  background: "linear-gradient(135deg, #F3E5F5 0%, #FFFFFF 100%)",
                }}
              >
                <CardContent>
                  <Box className="flex items-start gap-3">
                    <Box
                      sx={{
                        backgroundColor: "#F3E5F5",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <LocalOfferIcon
                        sx={{ color: "#4A148C", fontSize: 28 }}
                      />
                    </Box>
                    <Box className="w-full">
                      <Typography
                        variant="h6"
                        className="font-bold text-indigo-800 mb-2"
                      >
                        Entry & Fees
                      </Typography>
                      <Divider sx={{ mb: 2, backgroundColor: "#CE93D8" }} />
                      <Typography variant="body2" color="text.secondary">
                        {detail.entryFee}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6 space-y-3"
            >
              <Button
                fullWidth
                variant="contained"
                onClick={handleGetDirections}
                sx={{
                  background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
                  color: "white",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(30, 100, 25, 0.4)",
                  },
                }}
                startIcon={<DirectionsIcon />}
              >
                Get Directions
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #1976D2 0%, #1565C0 100%)",
                  color: "white",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(21, 101, 192, 0.4)",
                  },
                }}
              >
                Plan Your Visit
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Related Places Section */}
      <Box className="bg-white/50 backdrop-blur-sm py-16 mt-8 border-t border-green-100">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              className="font-bold text-green-800 mb-8 text-center"
            >
              🌿 Explore Other Nearby Places
            </Typography>
          </motion.div>
          <Grid container spacing={4}>
            {topPlacesToVisit
              .slice(0, 3)
              .filter((p) => p.name !== place.name)
              .map((relatedPlace, idx) => (
                <Grid item xs={12} sm={6} md={4} key={relatedPlace.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      className="hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-green-200"
                      onClick={() =>
                        router.push(`/place/${relatedPlace.name}`)
                      }
                      sx={{
                        background: "linear-gradient(135deg, #F1F8E9 0%, #FFFFFF 100%)",
                        borderRadius: 2,
                      }}
                    >
                      <Box className="relative h-48 overflow-hidden group">
                        <Box
                          component="img"
                          src={relatedPlace.image}
                          alt={relatedPlace.name}
                          sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                            transform: "scale(1)",
                            "&:hover": {
                              transform: "scale(1.1)",
                            },
                          }}
                        />
                        <Box className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </Box>
                      <CardContent>
                        <Typography
                          variant="h6"
                          className="font-semibold text-green-700 mb-2"
                        >
                          {relatedPlace.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="line-clamp-2"
                        >
                          {relatedPlace.description}
                        </Typography>
                        <Button
                          size="small"
                          sx={{
                            color: "#2E7D32",
                            marginTop: 1,
                            fontWeight: 600,
                            "&:hover": {
                              backgroundColor: "#E8F5E9",
                            },
                          }}
                        >
                          Explore →
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </Box>
    </>
  );
}
