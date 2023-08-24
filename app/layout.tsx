import Navbar from "@/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { StateContextProvider } from "../context/state";

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
