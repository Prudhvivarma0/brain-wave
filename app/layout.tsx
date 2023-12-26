import { ThemeProvider } from '@/components/providers/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brainwave: Telecommunication',
  description: 'F29SO Group 9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn (
          font.className,
          "bg-white dark:bg-[#301934]"
          )}>
          <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          storageKey='brainwave-theme'
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
