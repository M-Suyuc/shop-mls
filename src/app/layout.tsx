import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import Provider from "@/components/provider/Provider";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
