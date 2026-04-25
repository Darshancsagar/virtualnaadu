import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import theme from "../../theme";
import Navbar from "@/components/Navbar";

declare global {
  interface Window {
    gtag: Function;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("pageview", {
          page_path: url,
          page_title: document.title,
        });
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
