import type React from "react"
import type { Metadata } from "next"

import "./globals.css"

import { StoreProvider } from "@/lib/store"
import { AuthGate } from "@/components/auth-gate"

export const metadata: Metadata = {
  title: "Contas e Prompts",
  description: "Organize suas contas e guarde seus melhores prompts.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark bg-black">
      <body className="font-sans antialiased">
        <AuthGate><StoreProvider>{children}</StoreProvider></AuthGate>
      </body>
    </html>
  )
}
