import type { Metadata } from "next";
import { Playfair_Display, Syne } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import { Instagram, Twitter, Facebook } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});
const syne = Syne({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "DRY DOWN | Fine Fragrance Fabric Conditioners",
  description:
    "Luxury fabric conditioners and laundry detergents. A sophisticated olfactory signature for your garments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${syne.variable} font-sans bg-brand-base text-brand-dark antialiased selection:bg-brand-accent selection:text-white`}
      >
        <CustomCursor />
        <Navbar />
        <main id="app-container" className="pt-20 min-h-screen">
          {children}
        </main>

        <footer className="bg-brand-dark text-brand-base py-20 px-6 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <h2 className="font-serif text-6xl mb-6 font-bold tracking-tighter">
                DRY DOWN.
              </h2>
              <p className="font-sans text-sm opacity-60 max-w-md leading-relaxed">
                Redefining the ritual of laundry. We blend heritage perfumery
                with modern textile science to create a detergent that cares for
                your fabrics and your senses.
              </p>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-brand-accent">
                Explore
              </h4>
              <ul className="space-y-4 font-serif text-lg opacity-80">
                <li>
                  <Link href="/about" className="hover:text-brand-accent">
                    About Dry Down
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/burnt-sugar"
                    className="hover:text-brand-accent"
                  >
                    Burnt Sugar
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/acid-bloom"
                    className="hover:text-brand-accent"
                  >
                    Acid Bloom
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/pale-ash"
                    className="hover:text-brand-accent"
                  >
                    Pale Ash
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-brand-accent">
                Contact
              </h4>
              <p className="font-sans text-sm opacity-60 mb-2 hover:text-brand-accent cursor-pointer transition-colors">
                concierge@drydown.com
              </p>
              <p className="font-sans text-sm opacity-60 hover:text-brand-accent cursor-pointer transition-colors">+1 (800) 555-0199</p>
              <div className="mt-8 flex gap-6 text-brand-base">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-all hover:-translate-y-1" aria-label="Instagram">
                  <Instagram size={24} strokeWidth={1.5} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-all hover:-translate-y-1" aria-label="Twitter">
                  <Twitter size={24} strokeWidth={1.5} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-brand-accent transition-all hover:-translate-y-1" aria-label="Facebook">
                  <Facebook size={24} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-20 pt-8 text-center font-sans text-xs opacity-40 uppercase tracking-widest">
            &copy; 2026 DRY DOWN COMMERCE. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
