import { Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Shaibin K B",
  description: "Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
        <Header/>
        {children}
        <Footer/>
        </ThemeProvider>
        </body>
    </html>
  );
}
