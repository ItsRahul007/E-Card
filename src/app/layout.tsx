import type { Metadata } from "next";
import "./globals.css";
import "remixicon/fonts/remixicon.css";
import Provider from "@/lib/util/Provider";
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
  noto_sans_khojki,
} from "@/lib/fonts/fonts";

export const metadata: Metadata = {
  title: "E-Card",
  description:
    "An E-Commerce web app where user can buy any product or they can add any product to their persional card and also they can list any of their fevorite item or product to their fevorite card.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  process.setMaxListeners(20);
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`font-inter bg-lightBg 
        ${inter.variable}
        ${rubik.variable}
        ${kanit.variable}
        ${nunito.variable}
        ${poppins.variable}
        ${roboto.variable}
        ${outfit.variable}
        ${ubuntu.variable}
        ${mukta.variable}
        ${noto_sans_khojki.variable}
      `}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
