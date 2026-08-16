import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    if (!apiKey || !channelId) {
      return res.status(500).json({
        message: "Missing YouTube API configuration",
      });
    }

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?key=${apiKey}` +
      `&channelId=${channelId}` +
      `&part=snippet,id` +
      `&order=date` +
      `&maxResults=12` +
      `&type=video`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({
        message: error,
      });
    }

    const data = await response.json();

    return res.status(200).json(data.items);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}