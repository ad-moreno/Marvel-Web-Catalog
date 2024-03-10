import Navbar from "#/features/components/Navbar";
import { FavoriteCharactersProvider } from "#/features/contexts/FavoriteCharactersContext";
import "#/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Marvel Catalog",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <FavoriteCharactersProvider>
          <Navbar />
          {children}
        </FavoriteCharactersProvider>
      </body>
    </html>
  );
}
