import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast-notification'
import LoginGuard from '@/components/panels/LoginGuard'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'ESPE - Comercializadora Electrodomésticos',
  description: 'Sistema de Facturación y Crédito',
  icons: {
    icon: '/icon.svg',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <ToastProvider>
          <LoginGuard>
            {children}
          </LoginGuard>
        </ToastProvider>
      </body>
    </html>
  )
}
