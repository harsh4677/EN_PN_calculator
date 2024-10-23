
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
const inter = Inter({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "NutriCraft",
  description: "EN & PN Calculator",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-2`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;