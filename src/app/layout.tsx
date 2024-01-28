import type { Metadata } from 'next';
import './globals.css';
import 'remixicon/fonts/remixicon.css';
import Provider from '@/lib/util/Provider';
import { inter } from '@/lib/fonts/fonts';

export const metadata: Metadata = {
  title: 'E-Card',
  description: 'An E-Commerce web app where user can buy any product or they can add any product to their persional card and also they can list any of their fevorite item or product to their fevorite card.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ inter.className }>
        <Provider>{ children }</Provider>
      </body>
    </html>
  )
}
