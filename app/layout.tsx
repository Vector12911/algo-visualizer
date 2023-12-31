import Head from "next/head";
import Navbar from "@/src/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/src/components/footer";
import { StateContextProvider } from "../src/context/state";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algorithm Visualizer",
  description: "It will provide visualization of different algorithm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="">
        <StateContextProvider>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </StateContextProvider>
      </body>
    </html>
  );
}
