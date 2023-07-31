import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from "./components/Sidebar"
import classNames from "classnames"
import RandomizeWidget from './components/RandomizeWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MHW Randomizer',
  description: 'A randomizer for Monster Hunter World',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classNames(inter.className, 'sm:flex relative m-2')}>
        <Sidebar />
        <main className="flex-1 px-4 pt-20 sm:pt-0">
          {children}
        </main>
        <RandomizeWidget />
      </body>
    </html>
  )
}
