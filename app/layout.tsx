import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import StairsTransition from "@/components/StairsTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Cell | Official Cybersecurity Club | SATI Vidisha",
  description: "Official student cybersecurity body and ethical hacking community of Samrat Ashok Technological Institute (SATI), Vidisha.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#06080d] text-white">
        <AuthProvider>
          <StairsTransition />
          {children}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}

