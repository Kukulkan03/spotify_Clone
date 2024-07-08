import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Supabaseprovider from "@/providers/supabaseproviders";
import Userprovider from "@/providers/userprovider";
import Modal from "@/providers/modalprovider";
import Modalprovider from "@/providers/modalprovider";
import ToasterProvider from "@/providers/toasterprovider";
import getsongsByuser from "@/actions/getsongsByuser";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProducts";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music",
};

export const revalidate =0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getsongsByuser();
  const productwithPrices = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <Supabaseprovider>
          <Userprovider>
            <Modalprovider products={productwithPrices}/>
        <Sidebar songs={userSongs}>
        {children}
        </Sidebar>
        <Player/>
        </Userprovider>
        </Supabaseprovider>
        </body>
    </html>
  );
}
