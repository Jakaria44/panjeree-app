import type React from "react"
import type { Metadata } from "next"
import { Hind_Siliguri } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Provider } from "jotai"

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "পাঞ্জেরী - পূর্ণাঙ্গ প্রস্তুতি",
  description: "একাডেমিক থেকে এডমিশন, এক প্ল্যাটফর্মেই সব ধরনের প্রস্তুতি। দেশের প্রথম পারসোনালাইজড লার্নিং প্ল্যাটফর্ম।",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bn">
      <body className={cn("min-h-screen bg-background font-sans antialiased", hindSiliguri.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
