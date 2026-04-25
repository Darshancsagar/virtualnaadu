"use client";

import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import { topPlacesToVisit } from "@/data/topPlacesToVisit";
import { imageGallery } from "@/data/imageGallery";
import EastIcon from "@mui/icons-material/East";
import ExploreIcon from "@mui/icons-material/Explore";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ImageIcon from "@mui/icons-material/Image";

export default function HomePage() {
  return (
    <Box className="bg-gradient-to-b from-orange-50 via-white to-green-50 min-h-screen">
      {/* Hero Section */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1530973954043-dc7f4d22117c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Animated Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/60 z-0"
        />

        {/* Animated Background Elements */}
        <Box className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"
          />
        </Box>

        {/* Content */}
        <Box className="relative z-10 p-6 max-w-4xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Chip
              icon={<ExploreIcon />}
              label="Discover Malenadu"
              sx={{
                backgroundColor: "#FFB74D",
                color: "#E65100",
                fontSize: "14px",
                padding: "20px 12px",
                marginBottom: 3,
              }}
            />
            <Typography
              variant="h2"
              className="font-bold mb-4 text-4xl sm:text-5xl md:text-7xl text-white drop-shadow-2xl leading-tight"
            >
              Welcome to <span className="text-orange-300">Virtual Naadu</span>
            </Typography>
            <Typography
              variant="h6"
              className="mb-8 text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow-lg max-w-3xl mx-auto"
            >
              Discover the green heart of Karnataka — Malenadu's hidden gems,
              waterfalls, and breathtaking landscapes await you.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link href="/places" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                endIcon={<EastIcon />}
                sx={{
                  backgroundColor: "#FFB74D",
                  color: "#E65100",
                  padding: "14px 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFA726",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(255, 167, 38, 0.4)",
                  },
                }}
              >
                Explore Places
              </Button>
            </Link>
            <Link href="/gallery" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#FFB74D",
                  color: "#FFB74D",
                  padding: "14px 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  border: "2px solid #FFB74D",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#FFB74D",
                    color: "#E65100",
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 24px rgba(255, 167, 38, 0.4)",
                  },
                }}
              >
                View Gallery
              </Button>
            </Link>
          </motion.div>
        </Box>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white"
        >
          <Typography variant="caption" className="block text-center mb-2">
            Scroll to explore
          </Typography>
          <Box className="text-2xl">⬇️</Box>
        </motion.div>
      </Box>

      {/* About Section */}
      <Box className="py-20 bg-white relative overflow-hidden">
        <Box className="absolute top-0 left-0 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl" />
        <Box className="absolute bottom-0 right-0 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box className="text-center mb-12">
              <Box className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4">
                <LandscapeIcon sx={{ color: "white", fontSize: 32 }} />
              </Box>
              <Typography
                variant="h3"
                className="font-bold text-orange-800 mb-4"
              >
                About Virtual Naadu
              </Typography>
              <Divider sx={{ width: "100px", margin: "0 auto 20px", backgroundColor: "#EF6C00", height: 3 }} />
            </Box>

            <Typography
              className="text-center mx-auto text-gray-700 text-lg max-w-3xl leading-relaxed"
            >
              Virtual Naadu is a comprehensive digital journey through the lush green landscapes,
              cascading waterfalls, pristine forests, and rich cultural heritage of the Malenadu region in
              Karnataka. Explore hidden gems, adventure trails, and spiritual destinations that define the
              beauty of the Western Ghats.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Top Places Section */}
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box className="text-center mb-12">
            <Box className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4">
              <LocalActivityIcon sx={{ color: "white", fontSize: 32 }} />
            </Box>
            <Typography
              variant="h3"
              className="font-bold text-orange-800 mb-4"
            >
              Top Places to Visit
            </Typography>
            <Divider sx={{ width: "100px", margin: "0 auto 20px", backgroundColor: "#EF6C00", height: 3 }} />
            <Typography className="text-gray-600 max-w-2xl mx-auto">
              Explore the most beautiful and captivating destinations across Malenadu
            </Typography>
          </Box>
        </motion.div>

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
                  <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full overflow-hidden border border-orange-100"
                    sx={{
                      background: "linear-gradient(135deg, #FFF3E0 0%, #FFFFFF 100%)",
                      borderRadius: 3,
                    }}
                  >
                    <Box className="relative h-48 overflow-hidden group">
                      <CardMedia
                        component="img"
                        image={place.image}
                        alt={`Place ${place.name}`}
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
                      <Chip
                        label={`Place ${index + 1}`}
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor: "#FFB74D",
                          color: "#E65100",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography
                        variant="h6"
                        className="font-semibold text-orange-700 mb-2"
                      >
                        {place.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="mb-3 line-clamp-2">
                        {place.description}
                      </Typography>
                      <Button
                        size="small"
                        sx={{ 
                          color: "#EF6C00", 
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: "#FFF3E0",
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

      {/* Gallery Section */}
      <Box className="py-20 bg-gradient-to-r from-orange-50 to-orange-50 relative overflow-hidden">
        <Box className="absolute top-0 right-0 w-40 h-40 bg-orange-100/20 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box className="text-center mb-12">
              <Box className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mb-4">
                <ImageIcon sx={{ color: "white", fontSize: 32 }} />
              </Box>
              <Typography
                variant="h3"
                className="font-bold text-orange-800 mb-4"
              >
                Gallery
              </Typography>
              <Divider sx={{ width: "100px", margin: "0 auto 20px", backgroundColor: "#EF6C00", height: 3 }} />
            </Box>
          </motion.div>

          <Grid container spacing={2}>
            {imageGallery.map((img, i) => (
              <Grid item xs={6} sm={4} md={4} key={i}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="aspect-[3/2] w-full rounded-xl shadow-lg overflow-hidden group cursor-pointer border border-orange-100">
                    <img
                      src={img.image}
                      alt={`Gallery ${img.name}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box className="text-center mt-10">
            <Link href="/gallery" style={{ textDecoration: "none" }}>
              <Button 
                variant="contained"
                sx={{
                  backgroundColor: "#EF6C00",
                  color: "white",
                  padding: "12px 32px",
                  fontSize: "16px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#E65100",
                    transform: "translateY(-3px)",
                    boxShadow: "0 8px 20px rgba(230, 81, 0, 0.3)",
                  },
                }}
              >
                View Full Gallery
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-orange-600 to-orange-600 text-white relative overflow-hidden">
        <Box className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <Box className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        
        <Container maxWidth="sm" className="relative z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center text-center w-full gap-4"
          >
            <Typography 
              variant="h4" 
              className="font-bold text-2xl sm:text-3xl md:text-4xl leading-tight w-full"
            >
              Ready to Explore Malenadu?
            </Typography>
            <Typography 
              variant="body1" 
              className="text-orange-50 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl w-full"
            >
              Start your journey through Karnataka's most beautiful destinations. From waterfalls to mountain peaks, adventure awaits!
            </Typography>
            <Link href="/places" style={{ textDecoration: "none", width: "100%", maxWidth: "300px", display: "flex" }}>
              <Button
                variant="contained"
                endIcon={<EastIcon />}
                fullWidth
                sx={{
                  backgroundColor: "#FFB74D",
                  color: "#E65100",
                  padding: "12px 28px",
                  fontSize: "15px",
                  fontWeight: 600,
                  borderRadius: "12px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  textTransform: "none",
                  letterSpacing: "0.3px",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  "&:hover": {
                    backgroundColor: "#FFA726",
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(255, 167, 38, 0.4)",
                  },
                  "&:active": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Start Exploring Now
              </Button>
            </Link>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
