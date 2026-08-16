"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { motion } from "framer-motion";

interface YoutubeVideo {
  id: {
    videoId: string;
  };

  snippet: {
    title: string;
    publishedAt: string;

    thumbnails: {
      high: {
        url: string;
      };

      medium: {
        url: string;
      };

      default: {
        url: string;
      };
    };
  };
}

export default function LatestVideos() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/youtube")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box py={10} textAlign="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        py: 10,
        background: "#F6FAF5",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          textAlign="center"
          fontWeight={700}
          gutterBottom
        >
          🎥 Latest Videos
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          mb={6}
        >
          Watch the latest stories from Malenaadu.
        </Typography>

        <Grid container spacing={4}>
          {videos?.map((video) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={video.id.videoId}
            >
              <motion.div
                whileHover={{
                  y: -10,
                }}
              >
                {/* <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: 4,
                    height: "100%",
                    transition: ".3s",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,.08)",

                    "&:hover": {
                      boxShadow:
                        "0 20px 40px rgba(0,0,0,.18)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={video.snippet.thumbnails.high.url}
                      height="220"
                      alt={video.snippet.title}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        bgcolor: "rgba(0,0,0,.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PlayCircleFilledRoundedIcon
                        sx={{
                          fontSize: 70,
                          color: "#fff",
                        }}
                      />
                    </Box>
                  </Box>

                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      gutterBottom
                    >
                      {video.snippet.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {new Date(
                        video.snippet.publishedAt
                      ).toLocaleDateString()}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                      target="_blank"
                      sx={{
                        mt: 3,
                        bgcolor: "#FF0000",
                        borderRadius: "999px",

                        "&:hover": {
                          bgcolor: "#D50000",
                        },
                      }}
                    >
                      Watch on YouTube
                    </Button>
                  </CardContent>
                </Card> */}
                <Card
  sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 4,
    transition: "all .35s ease",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 20px 45px rgba(0,0,0,.16)",
    },
  }}
>
  {/* Thumbnail */}
  <Box
    sx={{
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
    }}
  >
    <CardMedia
      component="img"
      image={video.snippet.thumbnails.high.url}
      alt={video.snippet.title}
      height="220"
      sx={{
        transition: "transform .4s ease",
        "&:hover": {
          transform: "scale(1.08)",
        },
      }}
    />

    {/* Dark Overlay */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        bgcolor: "rgba(0,0,0,.25)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: ".3s",
        "&:hover": {
          bgcolor: "rgba(0,0,0,.35)",
        },
      }}
    >
      <PlayCircleFilledRoundedIcon
        sx={{
          fontSize: 72,
          color: "#fff",
          opacity: 0.95,
        }}
      />
    </Box>
  </Box>

  <CardContent
    sx={{
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      p: 3,
    }}
  >
    {/* Title */}
    <Typography
      variant="h6"
      fontWeight={700}
      sx={{
        lineHeight: 1.4,
        minHeight: 60,
        mb: 1,
      }}
    >
      {video.snippet.title}
    </Typography>

    {/* Date */}
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        fontSize: 13,
      }}
    >
      📅{" "}
      {new Date(video.snippet.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </Typography>

    {/* Description */}
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        flexGrow: 1,
        lineHeight: 1.7,
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        mb: 3,
      }}
    >
      {video.snippet.description || "Watch this amazing Malenaadu travel story on our YouTube channel."}
    </Typography>

    {/* Button */}
    <Button
      fullWidth
      variant="contained"
      startIcon={<YouTubeIcon />}
      href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        mt: "auto",
        py: 1.4,
        borderRadius: "999px",
        bgcolor: "#FF0000",
        fontWeight: 700,
        textTransform: "none",
        fontSize: 15,
        "&:hover": {
          bgcolor: "#D50000",
        },
      }}
    >
      Watch on YouTube
    </Button>
  </CardContent>
</Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Box
          mt={8}
          textAlign="center"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<YouTubeIcon />}
            href="https://www.youtube.com/channel/UCcixb1jlrPIQlrXs3t48whw?sub_confirmation=1"
            target="_blank"
            sx={{
              bgcolor: "#FF0000",
              px: 5,
              py: 1.5,
              borderRadius: "999px",

              "&:hover": {
                bgcolor: "#D50000",
              },
            }}
          >
            Visit My YouTube Channel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}