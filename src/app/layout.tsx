import type { Metadata } from 'next';
import './globals.css';
import 'remixicon/fonts/remixicon.css';
import Provider from '@/lib/util/Provider';
import {
  inter,
  rubik,
  kanit,
  nunito,
  poppins,
  roboto,
  outfit,
  ubuntu,
  mukta,
} from '@/lib/fonts/fonts';

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
      <body
        className={ `font-inter
        ${inter.variable}
        ${rubik.variable}
        ${kanit.variable}
        ${nunito.variable}
        ${poppins.variable}
        ${roboto.variable}
        ${outfit.variable}
        ${ubuntu.variable}
        ${mukta.variable}

      `}
      >
        <Provider>{ children }</Provider>
      </body>
    </html>
  )
}
