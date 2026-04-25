"use client";

import { Box, Container, Typography, Link as MuiLink, Grid, Divider } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Places", href: "/places" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Home", href: "/" },
  ];

  return (
    <Box component="footer" className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">
      <Container maxWidth="lg" className="py-12 sm:py-16">
        <Grid container spacing={4} className="mb-8">
          {/* Branding Section */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Box className="mb-4">
                <Typography variant="h5" className="font-bold text-white mb-2 flex items-center gap-2">
                  🌿 Virtual Naadu
                </Typography>
                <Typography variant="body2" className="text-gray-400 leading-relaxed">
                  Explore the beauty, culture, and nature of Malenadu virtually — one place at a time.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Typography variant="subtitle1" className="font-bold text-white mb-4">
                Quick Links
              </Typography>
              <Box className="space-y-2">
                {footerLinks.map((link) => (
                  <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>
                    <MuiLink
                      component="span"
                      className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm block"
                      underline="none"
                    >
                      → {link.label}
                    </MuiLink>
                  </Link>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="subtitle1" className="font-bold text-white mb-4">
                Contact Us
              </Typography>
              <Box className="space-y-3">
                <Box className="flex items-center gap-2">
                  <EmailIcon sx={{ fontSize: 18, color: "#A5D6A7", flexShrink: 0 }} />
                  <Typography variant="body2" className="text-gray-400 text-sm">
                    everyinformation11@gmail.com
                  </Typography>
                </Box>
                <Box className="flex items-start gap-2">
                  <LocationOnIcon sx={{ fontSize: 18, color: "#A5D6A7", flexShrink: 0, mt: 0.3 }} />
                  <Typography variant="body2" className="text-gray-400 text-sm">
                    Malenadu, Karnataka, India
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", my: 4 }} />

        {/* AI Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box className="bg-gradient-to-r from-orange-900/20 via-orange-800/15 to-orange-900/20 border border-orange-700/30 rounded-lg p-4 mb-4">
            <Typography variant="caption" className="text-orange-200/80 text-xs leading-relaxed block">
              <span className="font-semibold text-orange-100">✨ AI-Generated Content Disclaimer:</span> This website is entirely created using Artificial Intelligence. All place descriptions, details, and information are AI-generated. While we strive for accuracy, please verify specific details with official sources before planning your visits. Images may be AI-generated or from stock sources.
            </Typography>
          </Box>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Box className="text-center">
            <Typography variant="body2" className="text-gray-500 text-sm">
              © {currentYear} Virtual Naadu. All rights reserved. | Made with 🌿 & ✨ AI for Malenadu
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Footer;
