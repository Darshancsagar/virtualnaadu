import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from "@mui/icons-material/Place";
import ImageIcon from "@mui/icons-material/Image";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Link from "next/link";

const navItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Places", icon: <PlaceIcon /> },
  { label: "Gallery", icon: <ImageIcon /> },
  { label: "Contact", icon: <ContactMailIcon /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        width: 280,
        height: "100vh",
        background: "linear-gradient(180deg, #EF6C00 0%, #E65100 100%)",
        padding: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: "bold", 
              color: "white",
              fontSize: "20px",
            }}
          >
            🌿 Virtual Naadu
          </Typography>
          <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", px: 1.2, py: 0.5, borderRadius: 1, backdropFilter: "blur(10px)" }}>
            <Typography sx={{ fontSize: "10px", fontWeight: "600", color: "#FFB74D", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              ✨ AI Powered
            </Typography>
          </Box>
        </Box>
        <IconButton 
          onClick={handleDrawerToggle}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ mt: 2 }}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem 
              component={Link}
              href={item.label === "Home" ? "/" : `/${item.label.toLowerCase()}`}
              button 
              sx={{
                my: 1,
                borderRadius: 2,
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  transform: "translateX(8px)",
                },
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", color: "#FFB74D" }}>
                {item.icon}
              </Box>
              <ListItemText 
                primary={item.label}
                sx={{ 
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                    fontSize: "16px",
                  }
                }}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Box sx={{ mt: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
          © 2026 Virtual Naadu. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky"
        sx={{
          background: "linear-gradient(90deg, #EF6C00 0%, #E65100 100%)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(46, 125, 50, 0.95)",
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: "space-between",
            padding: "12px 24px",
            minHeight: 70,
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box 
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateX(-4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: "32px",
                  }}
                >
                  🌿
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ 
                    fontWeight: "bold", 
                    color: "white",
                    fontSize: "20px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Virtual Naadu
                </Typography>
              </Box>
            </Link>
          </motion.div>

          {isMobile ? (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleDrawerToggle}
              aria-label="menu"
              sx={{
                color: "white",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <MenuIcon sx={{ fontSize: 28 }} />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    component={Link}
                    href={item.label === "Home" ? "/" : `/${item.label.toLowerCase()}`}
                    sx={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      display: "flex",
                      gap: 0.5,
                      alignItems: "center",
                      position: "relative",
                      "&:hover": { 
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        transform: "translateY(-2px)",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "2px",
                        backgroundColor: "#FFB74D",
                        transition: "width 0.3s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ 
          keepMounted: false,
          sx: {
            "& .MuiBackdrop-root": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
        SlideProps={{
          timeout: 300,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
