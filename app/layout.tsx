import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "react-hot-toast"
import { WishlistProvider } from "@/components/wishlist/wishlist-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans", inter.variable)}
    >
      <body
        className={cn(
          "antialiased",
          fontMono.variable,
          "font-sans",
          inter.variable
        )}
      >
        <ThemeProvider>
          <WishlistProvider>
            <Navbar />
            {children}
            <Footer />
          </WishlistProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </ThemeProvider>
      </body>
    </html>
  )
}
