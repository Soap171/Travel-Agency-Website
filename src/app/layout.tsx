import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SplashLoader } from "@/components/SplashLoader";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Horizon Luxe Journeys | Luxury Travel Agency & Bespoke Bookings",
  description:
    "Discover hand-curated luxury travel experiences, bespoke international holiday packages, and seamless itinerary booking. Your ultimate journey begins here.",
  metadataBase: new URL("https://www.horizonluxejourneys.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Horizon Luxe Journeys | Curated Luxury Travel Expeditions",
    description:
      "Witness remote private islands, high-alpine peak chalets, and eco-architectural sanctuaries around the world.",
    url: "https://www.horizonluxejourneys.com",
    siteName: "Horizon Luxe Journeys",
    images: [
      {
        url: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Horizon Luxe Journeys Luxury Escapes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Luxe Journeys | Custom Luxury Travel",
    description:
      "Bespoke international itineraries and secure reservations. Tour the world in absolute comfort.",
    images: [
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TravelAgency structured JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Horizon Luxe Journeys",
    "url": "https://www.horizonluxejourneys.com",
    "image": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200",
    "description": "Discover hand-curated luxury travel experiences, bespoke international holiday packages, and seamless itinerary booking. Your ultimate journey begins here.",
    "telephone": "+1-800-555-LUXE",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "5th Avenue, Suite 450",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "priceRange": "$$$$"
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background-luxe text-foreground-luxe font-sans">
        <ThemeProvider>
          <BookingProvider>
            <SplashLoader />
            <Navbar />
            <main className="flex-grow flex flex-col w-full relative">
              {children}
            </main>
            <Footer />
          </BookingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
