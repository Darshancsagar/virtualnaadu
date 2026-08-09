import type { NextApiRequest, NextApiResponse } from "next";

type WeatherResponse = {
  current: any;
  daily: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherResponse | { error: string }>
) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({
      error: "Latitude and Longitude are required",
    });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&forecast_days=7&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather API failed");
    }

    const data = await response.json();

    // Cache for 1 hour
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400"
    );

    return res.status(200).json({
      current: data.current,
      daily: data.daily,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Unable to fetch weather",
    });
  }
}