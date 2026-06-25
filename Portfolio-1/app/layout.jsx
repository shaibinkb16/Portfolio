import { Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import CursorGlow from "@/components/ui/CursorGlow";
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";
import { Suspense } from "react";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Shaibin K B",
  description: "Software Engineer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <CursorGlow />
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>
          <Header/>
          {children}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
