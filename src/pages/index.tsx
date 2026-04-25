import Head from "next/head";
import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Top Tourist Places in Malenadu | Virtual Naadu</title>
        <meta name="google-site-verification" content="Re11hYAbsP5ClYwY4cVhtQYREcF7Eni7oodXbgiqfRo" />
        <meta
          name="description"
          content="Explore the hidden gems, waterfalls, temples, and scenic spots of Malenadu - curated by Virtual Naadu. Discover places to visit near the Western Ghats. Find detailed travel guides, best times to visit, and accommodation options for 13 top tourist destinations."
        />
        <meta name="keywords" content="Malenadu, Karnataka Tourism, Hill Stations, Waterfalls, Trekking in Western Ghats, Chikmagalur, Agumbe, Kudremukh, Coorg, Jog Falls, Virtual Naadu, Tourist Places in Karnataka, Malnad Road Trip, Travel Guide" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Virtual Naadu" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="charset" content="UTF-8" />
        <meta name="language" content="English" />
        <meta property="og:title" content="Top Tourist Places in Malenadu | Virtual Naadu" />
        <meta
          property="og:description"
          content="Discover unexplored tourist spots in the Malenadu region including waterfalls, hills, and cultural sites with detailed travel information."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.virtualnaadu.com" />
        <meta property="og:image" content="/images/malenadu-og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Tourist Places in Malenadu | Virtual Naadu" />
        <meta name="twitter:description" content="Explore beautiful tourist destinations in Malenadu with guides and travel information" />
      </Head>
      <HomePage />
      <Footer/>
    </>
  );
}
