import Navbar from "#/features/components/Navbar";
import { FavoriteCharactersProvider } from "#/features/contexts/FavoriteCharactersContext";
import "#/styles/globals.css";

import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
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
      <body className={`font-sans ${roboto.variable}`}>
        <FavoriteCharactersProvider>
          <Navbar />
          {children}
        </FavoriteCharactersProvider>
      </body>
    </html>
  );
}
