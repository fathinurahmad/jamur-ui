import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Deteksi Jamur",
  description: "Aplikasi Deteksi Jamur Menggunakan AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <header className="flex items-center gap-3 p-4 shadow-sm bg-white border-b">
          {/* SVG Logo Jamur langsung ditulis inline */}
          <div className="w-9 h-9">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2D6A4F"
              className="w-full h-full"
            >
              <path d="M12 2C6.48 2 2 6.03 2 10.5 2 12.43 4.69 14 8 14h.3c.24 0 .45.17.49.41l.68 4.09A1.5 1.5 0 0011 20h2a1.5 1.5 0 001.53-1.5l.68-4.09c.04-.24.25-.41.49-.41H16c3.31 0 6-1.57 6-3.5C22 6.03 17.52 2 12 2zM9.5 17.5l-.5-3h6l-.5 3h-5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-green-800 tracking-wide">
            Jamur UI
          </h1>
        </header>
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
      </body>
    </html>
  )
}
