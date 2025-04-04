import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import Providers from "@/components/providers/Providers";

export const metadata: Metadata = {
  title: {
    template: "%s - MLS | Shop",
    default: "Home - MLS | Shop",
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
