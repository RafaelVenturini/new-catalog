import type {Metadata} from "next";
import {DM_Sans, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import 'swiper/css'
import ThemeRegistry from "@app/themeRegistry";
import {ListProvider} from "@components/listContext";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    display: 'swap',
    variable: '--font-dm-sans',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalogo Liss Fitness",
  description: "Sua loja de roupas fitness femininas no atacado. Unindo estilo e performance para você vender roupas de destaque. Conforto e qualidade em cada peça.",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
  return (
      <html lang="pt-BR" className={dmSans.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeRegistry>
          <ListProvider>
              {children}
          </ListProvider>
      </ThemeRegistry>
      </body>
    </html>
  );
}
