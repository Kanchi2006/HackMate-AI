import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { PostHogProvider } from "@/app/providers/posthog-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "HackMate AI — Discover. Build. Compete.",
    template: "%s | HackMate AI",
  },
  description:
    "Discover hackathons, connect with innovators, develop new skills, and turn your ideas into impact.",
  authors: [
    {
      name: "HackMate_AI",
      url: "https://github.com/kamakshi232006/HackMate_AI",
    },
  ],
  openGraph: {
    title: "HackMate AI — Discover. Build. Compete.",
    description:
      "Discover hackathons, connect with innovators, develop new skills, and turn your ideas into impact.",
    siteName: "HackMate AI",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  )
}
