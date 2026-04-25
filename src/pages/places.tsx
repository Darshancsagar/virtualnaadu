import Head from "next/head";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container, Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { motion } from "framer-motion";
import { topPlacesToVisit } from "@/data/topPlacesToVisit";
import Link from "next/link";
import { collectionPageSchema, breadcrumbSchema } from "@/utils/schemas";

export default function Places() {
  const collectionSchema = collectionPageSchema({
    name: "Tourist Places in Malenadu",
    description: "Explore top 13 tourist places in Malenadu including Jog Falls, Coorg, Chikmagalur, Kudremukh, and more.",
    url: "https://www.virtualnaadu.com/places",
    image: "https://www.virtualnaadu.com/images/malenadu-places.jpg",
    numberOfItems: topPlacesToVisit.length,
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.virtualnaadu.com" },
    { name: "Places", url: "https://www.virtualnaadu.com/places" },
  ]);

  return (
    <>
      <Head>
        <title>Places to Visit in Malenadu | Virtual Naadu - Tourist Destinations</title>
        <Script
          id="collection-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
        <meta
          name="description"
          content="Explore top 13 tourist places in Malenadu - Jog Falls, Agumbe, Kudremukh, Coorg, Dandeli & more. Get detailed information, directions, and travel guides."
        />
        <meta 
          name="keywords" 
          content="places to visit Malenadu, tourist destinations Karnataka, Jog Falls, Coorg, Chikmagalur, Kudremukh, Agumbe, Dandeli, Hemavati, Nandi Hills, waterfalls in Karnataka"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Virtual Naadu" />
        <meta property="og:title" content="Places to Visit in Malenadu | Virtual Naadu" />
        <meta
          property="og:description"
          content="Discover 13 must-visit places in Malenadu region with detailed information about attractions, activities, and travel guides."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.virtualnaadu.com/places" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" component="h1" className="font-bold mb-4">
              🌿 Explore Places in Malenadu
            </Typography>
            <Typography variant="h6" className="text-center mx-auto">
              Discover 13 spectacular destinations across Karnataka's Western Ghats region with detailed information, attractions, and travel guides.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Places Grid */}
      <Container className="py-16">
        <Grid container spacing={4}>
          {topPlacesToVisit.map((place, index) => (
            <Grid item xs={12} sm={6} md={4} key={place.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/place/${place.name}`} style={{ textDecoration: "none" }}>
                  <Card
                    className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full overflow-hidden border border-green-100"
                    sx={{
                      background: "linear-gradient(135deg, #F1F8E9 0%, #FFFFFF 100%)",
                      borderRadius: 3,
                    }}
                  >
                    <Box className="relative h-48 overflow-hidden group">
                      <CardMedia
                        component="img"
                        image={place.image}
                        alt={`${place.name} - Tourist Place in Malenadu`}
                        sx={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          transition: "transform 0.4s ease",
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
                        {place.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="mb-3 line-clamp-2">
                        {place.description}
                      </Typography>
                      <Button
                        size="small"
                        sx={{
                          color: "#2E7D32",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: "#E8F5E9",
                          }
                        }}
                      >
                        View Details →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
