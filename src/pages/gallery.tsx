import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container, Box, Typography, Grid, Card, CardMedia, Button } from "@mui/material";
import { motion } from "framer-motion";
import { imageGallery } from "@/data/imageGallery";

export default function Gallery() {
  return (
    <>
      <Head>
        <title>Gallery | Malenadu Photo Collection | Virtual Naadu</title>
        <meta
          name="description"
          content="Browse stunning photo gallery of Malenadu - beautiful waterfalls, scenic viewpoints, temples, and natural landscapes from the Western Ghats."
        />
        <meta
          name="keywords"
          content="Malenadu gallery, Karnataka waterfalls photos, scenic views, temple photography, Western Ghats images, nature photography"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Virtual Naadu" />
        <meta property="og:title" content="Gallery | Malenadu Photo Collection | Virtual Naadu" />
        <meta
          property="og:description"
          content="Explore stunning visual collection of tourist places and natural beauty in Malenadu region."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.virtualnaadu.com/gallery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)",
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
            <Typography variant="h3" component="h1" className="text-center font-bold mb-4">
              📸 Malenadu Photo Gallery
            </Typography>
            <Typography variant="h6" className="text-center">
              Explore breathtaking photographs of Malenadu's natural beauty, waterfalls, temples, and scenic landscapes.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Container className="py-16">
        <Grid container spacing={3}>
          {imageGallery.map((image: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={image.name}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8 }}
              >
                <Card
                  className="hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden"
                  sx={{
                    borderRadius: 2,
                    height: "240px",
                    position: "relative",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={image.image}
                      alt={`${image.name} - Malenadu Tourist Place`}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                    {/* Overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        transition: "backgroundColor 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "12px",
                        zIndex: 1,
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.4)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontWeight: 600,
                          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        {image.name}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
