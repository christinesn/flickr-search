import { Inter } from 'next/font/google'
import './globals.css'
import dotenv from 'dotenv/config'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Search Flickr',
  description: 'A Flickr photo search app that consumes Flickr\'s REST API.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@900&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
