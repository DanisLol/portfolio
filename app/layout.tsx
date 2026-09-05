import type { Metadata } from "next";
import { EB_Garamond, Geist, Geist_Mono, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["700"],
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const danHand = localFont({
  src: "./fonts/DanHand-Regular.ttf",
  variable: "--font-danhand",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Myeongjin",
    template: "%s · Myeongjin",
  },
  description:
    "CS (HCI) at the University of Toronto. Software, product, and launches.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${ebGaramond.variable} ${danHand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
