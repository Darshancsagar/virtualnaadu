import { useState , useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";

interface Props {
  lat: number;
  lon: number;
}

interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };

  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    weather_code: number[];
  };
}

const weatherIcon = (code: number) => {
  if (code === 0) return "☀️";
  if (code <= 3) return "🌤";
  if (code <= 48) return "☁️";
  if (code <= 67) return "🌧";
  if (code <= 77) return "🌨";
  if (code <= 82) return "🌧";
  if (code <= 99) return "⛈";

  return "☀️";
};

const weatherText = (code: number) => {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Cloudy";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Heavy Rain";
  if (code <= 99) return "Thunderstorm";

  return "Clear";
};

export default function WeatherCard({ lat, lon }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((r) => r.json())
      .then(setWeather);
  }, [lat, lon]);

  if (!weather)
    return (
      <Box textAlign="center" py={8}>
        <CircularProgress />
      </Box>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      viewport={{ once: true }}
    >
      <Card
        sx={{
          mt:5,
          borderRadius:5,
          background:
            "linear-gradient(135deg,#2196F3 0%,#64B5F6 40%,#BBDEFB 100%)",
          color:"white",
          overflow:"hidden"
        }}
      >
        <CardContent>

          <Typography
            variant="h5"
            fontWeight="bold"
            mb={3}
          >
            🌤 Current Weather
          </Typography>

          <Grid container spacing={4}>

            <Grid item xs={12} md={5}>

              <Typography
                sx={{fontSize:70}}
              >
                {weatherIcon(weather.current.weather_code)}
              </Typography>

              <Typography
                variant="h2"
                fontWeight="bold"
              >
                {Math.round(weather.current.temperature_2m)}°
              </Typography>

              <Typography
                variant="h6"
              >
                {weatherText(weather.current.weather_code)}
              </Typography>

            </Grid>

            <Grid item xs={12} md={7}>

              <Grid container spacing={2}>

                <Grid item xs={6}>
                  <Card sx={{background:"rgba(255,255,255,.18)"}}>
                    <CardContent>

                      <WaterDropIcon />

                      <Typography variant="h5">
                        {weather.current.relative_humidity_2m}%
                      </Typography>

                      <Typography>
                        Humidity
                      </Typography>

                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card sx={{background:"rgba(255,255,255,.18)"}}>
                    <CardContent>

                      <AirIcon />

                      <Typography variant="h5">
                        {weather.current.wind_speed_10m}
                      </Typography>

                      <Typography>
                        km/h
                      </Typography>

                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card sx={{background:"rgba(255,255,255,.18)"}}>
                    <CardContent>

                      <WbSunnyIcon />

                      <Typography variant="body1">

                        {new Date(
                          weather.daily.sunrise[0]
                        ).toLocaleTimeString([],{
                          hour:"2-digit",
                          minute:"2-digit"
                        })}

                      </Typography>

                      <Typography>
                        Sunrise
                      </Typography>

                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={6}>
                  <Card sx={{background:"rgba(255,255,255,.18)"}}>
                    <CardContent>

                      <NightsStayIcon />

                      <Typography variant="body1">

                        {new Date(
                          weather.daily.sunset[0]
                        ).toLocaleTimeString([],{
                          hour:"2-digit",
                          minute:"2-digit"
                        })}

                      </Typography>

                      <Typography>
                        Sunset
                      </Typography>

                    </CardContent>
                  </Card>
                </Grid>

              </Grid>

            </Grid>

          </Grid>

        </CardContent>
      </Card>

      <Grid
        container
        spacing={2}
        mt={2}
      >
        {weather.daily.time.map((day,index)=>(

          <Grid
            item
            xs={6}
            md={12/7}
            key={day}
          >

            <Card
              sx={{
                borderRadius:4,
                textAlign:"center",
                py:2,
                transition:".3s",

                "&:hover":{
                  transform:"translateY(-6px)"
                }
              }}
            >

              <Typography
                fontWeight="bold"
              >
                {new Date(day).toLocaleDateString("en",{
                  weekday:"short"
                })}
              </Typography>

              <Typography
                sx={{fontSize:35}}
              >
                {weatherIcon(
                  weather.daily.weather_code[index]
                )}
              </Typography>

              <Typography>

                {Math.round(
                  weather.daily.temperature_2m_max[index]
                )}°

                /

                {Math.round(
                  weather.daily.temperature_2m_min[index]
                )}°

              </Typography>

              <Typography
                color="primary"
              >
                🌧 {weather.daily.precipitation_probability_max[index]}%
              </Typography>

            </Card>

          </Grid>

        ))}
      </Grid>

    </motion.div>
  );
}