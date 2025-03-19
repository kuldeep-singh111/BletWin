import { Geist, Geist_Mono, Alex_Brush, Alegreya_SC, Aleo, Abril_Fatface, Agbalumo, Arizonia } from "next/font/google";
import "./globals.css";

import { UserProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-abril'
});

const agbalumo = Agbalumo({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-agbalumo'
});

const alegreyaSC = Alegreya_SC({
  subsets: ['latin'],
  variable: '--font-alegreya-sc',
  weight: ['400', '500', '700'],
});

const aleo = Aleo({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-aleo',
});

const arizonia = Arizonia({
  subsets: ['latin'],
  variable: '--font-arizonia',
  weight: '400'
})

export const metadata = {
  title: "Lyaim Tech Fantasy",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${alexBrush.variable} ${alegreyaSC.variable} ${aleo.variable}  ${abrilFatface.variable} ${agbalumo.variable} ${arizonia.variable} antialiased`}
        >
          <Toaster reverseOrder={false} />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
