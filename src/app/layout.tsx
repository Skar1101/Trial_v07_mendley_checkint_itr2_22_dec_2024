import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mendly - Your AI Companion',
  description: 'Experience personalized AI interactions with Mendly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500">
          <header className="p-4">
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
              <a href="/" className="text-white text-2xl font-bold">Mendly</a>
              <div className="space-x-4">
                <a href="/chat" className="text-white hover:text-purple-200">Chat</a>
                <a href="/journal" className="text-white hover:text-purple-200">Journal</a>
                <a href="/memory" className="text-white hover:text-purple-200">Memory</a>
              </div>
            </nav>
          </header>
          <main className="max-w-6xl mx-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

