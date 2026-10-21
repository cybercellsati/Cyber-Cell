import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import StairsTransition from "@/components/StairsTransition";
import CyberSplashScreen from "@/components/CyberSplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://cyber-cell.vercel.app");

const OG_IMAGE_URL =
  "https://res.cloudinary.com/qtfezfsf/image/upload/v1792570182/cybercell/seo/og-image.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Cyber Cell | Official Cybersecurity Club | SATI Vidisha",
  description:
    "Official student cybersecurity body and ethical hacking community of Samrat Ashok Technological Institute (SATI), Vidisha.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Cyber Cell | Official Cybersecurity Club | SATI Vidisha",
    description:
      "Official student cybersecurity body and ethical hacking community of Samrat Ashok Technological Institute (SATI), Vidisha.",
    url: siteUrl,
    siteName: "Cyber Cell SATI",
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Cyber Cell, SATI Vidisha Official Logo",
        type: "image/png",
      },
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cyber Cell, SATI Vidisha Official Logo",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyber Cell | Official Cybersecurity Club | SATI Vidisha",
    description:
      "Official student cybersecurity body and ethical hacking community of Samrat Ashok Technological Institute (SATI), Vidisha.",
    images: [OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@500;600;700;800;900&family=Cinzel+Decorative:wght@700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Great+Vibes&family=Montserrat:wght@600;700;800&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
        />
        {/* Explicit OpenGraph & WhatsApp preview tags with permanent global CDN */}
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Cyber Cell, SATI Vidisha Official Logo" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <link rel="image_src" href={OG_IMAGE_URL} />
      </head>
      <body className="min-h-full flex flex-col bg-[#06080d] text-white">
        <AuthProvider>
          <CyberSplashScreen />
          <StairsTransition />
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
