import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Container, Box, Typography, TextField, Button, Card, CardContent, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { Email, LocationOn, Send } from "@mui/icons-material";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // TODO: Implement actual email sending
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Virtual Naadu - Malenadu Tourism Information</title>
        <meta
          name="description"
          content="Contact Virtual Naadu for tourism information about Malenadu, travel guides, and inquiries about places to visit in Karnataka's Western Ghats."
        />
        <meta
          name="keywords"
          content="contact Virtual Naadu, Malenadu tourism inquiry, Karnataka tourism information, travel assistance"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Virtual Naadu" />
        <meta property="og:title" content="Contact Us | Virtual Naadu" />
        <meta
          property="og:description"
          content="Get in touch with Virtual Naadu for Malenadu tourism information and travel assistance."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.virtualnaadu.com/contact" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6A1B9A 0%, #4A148C 100%)",
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
              📞 Get In Touch
            </Typography>
            <Typography variant="h6" className="max-w-2xl mx-auto">
              Have questions about Malenadu? We'd love to hear from you. Reach out to us for travel recommendations and information.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container className="py-16">
        <Grid container spacing={6}>
          {/* Contact Info Cards */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box className="space-y-6">
                <Typography variant="h5" className="font-semibold text-gray-800 mb-6">
                  Contact Information
                </Typography>

                {/* Email Card */}
                <Card
                  className="hover:shadow-lg transition-all"
                  sx={{
                    background: "linear-gradient(135deg, #F3E5F5 0%, #FCE4EC 100%)",
                    borderLeft: "4px solid #6A1B9A",
                  }}
                >
                  <CardContent className="flex items-start gap-4">
                    <Email className="text-purple-600 mt-1" />
                    <Box>
                      <Typography variant="h6" className="font-semibold">
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        everyinformation11@gmail.com
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>

                {/* Location Card */}
                <Card
                  className="hover:shadow-lg transition-all"
                  sx={{
                    background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
                    borderLeft: "4px solid #2E7D32",
                  }}
                >
                  <CardContent className="flex items-start gap-4">
                    <LocationOn className="text-green-600 mt-1" />
                    <Box>
                      <Typography variant="h6" className="font-semibold">
                        Location
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Malenadu Region, Karnataka, India
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-lg" sx={{ borderRadius: 2 }}>
                <CardContent className="p-8">
                  <Typography variant="h5" className="font-semibold text-gray-800 mb-6">
                    Send us a Message
                  </Typography>

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <Box
                        className="text-6xl mb-4"
                        sx={{ color: "#2E7D32" }}
                      >
                        ✓
                      </Box>
                      <Typography variant="h6" className="font-semibold text-green-600">
                        Thank You!
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="mt-2">
                        We've received your message. We'll get back to you soon!
                      </Typography>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        className="mb-4"
                      />
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        className="mb-4"
                      />
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        className="mb-4"
                      />
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                        className="mb-4"
                      />
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          startIcon={<Send />}
                          sx={{
                            background: "linear-gradient(135deg, #6A1B9A 0%, #4A148C 100%)",
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: "none",
                            fontSize: "1rem",
                            "&:hover": {
                              background: "linear-gradient(135deg, #7E57C2 0%, #6A1B9A 100%)",
                            },
                          }}
                        >
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  );
}
