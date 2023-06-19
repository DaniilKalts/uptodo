import './globals.css'
import { Lato } from 'next/font/google'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300','400','700']
})

export const metadata = {
  title: 'UpTodo 2023',
  description: 'A modern To-Do application built by Nextjs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  )
}
