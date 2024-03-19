import { Inter, Kanit, Mukta, Nunito, Outfit, Poppins, Roboto, Rubik, Ubuntu, Noto_Sans_Khojki } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: "--font-inter" });

const rubik = Rubik({
    weight: "variable",
    style: "normal",
    subsets: ["latin"],
    variable: "--font-rubik"
});

const outfit = Outfit({
    weight: "variable",
    style: "normal",
    subsets: ["latin"],
    variable: "--font-outfit"
});

const kanit = Kanit({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin-ext"],
    style: 'italic',
    variable: "--font-kanit"
});

const nunito = Nunito({
    weight: "variable",
    subsets: ["latin-ext"],
    variable: "--font-nunito"
});

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ['latin'],
    style: ["normal"],
    variable: "--font-poppins"
});

const roboto = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-roboto"
});

const ubuntu = Ubuntu({
    weight: ["300", "400", "500", "700"],
    subsets: ['latin'],
    display: 'swap',
    variable: "--font-ubuntu"
});

const mukta = Mukta({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ['latin'],
    style: "normal",
    variable: "--font-mukta"
});

const noto_sans_khojki = Noto_Sans_Khojki({
    weight: '400',
    subsets: ['latin'],
    style: "normal",
    variable: "--font-noto_sans_khojki"
});

export {
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
};