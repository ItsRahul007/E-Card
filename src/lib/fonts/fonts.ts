import { Inter, Kanit, Mukta, Nunito, Outfit, Poppins, Roboto, Rubik, Ubuntu } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

const rubik = Rubik({
    weight: ["700", "500"],
    style: "normal",
    subsets: ["latin"]
});

const outfit = Outfit({
    weight: "400",
    style: "normal",
    subsets: ["latin"]
});

const rubik500 = Rubik({
    weight: "500",
    style: "normal",
    subsets: ["latin"]
});

const kanit = Kanit({
    weight: "600",
    subsets: ["latin-ext"],
    style: 'italic'
});

const kanit500 = Kanit({
    weight: "500",
    subsets: ["latin-ext"],
    style: 'italic'
});

const nunito = Nunito({
    weight: "600",
    subsets: ["latin-ext"]
});

const poppins = Poppins({
    weight: '600',
    subsets: ['latin'],
    style: ["normal"]
});

const roboto = Roboto({
    weight: "400",
    subsets: ['latin'],
    display: 'swap',
});

const ubuntu700 = Ubuntu({
    weight: "700",
    subsets: ["latin-ext",],
    style: 'normal'
});

const roboto700 = Roboto({
    weight: '700',
    subsets: ['latin'],
    style: ["normal"]
});

const mukta700 = Mukta({
    weight: '700',
    subsets: ['latin'],
    style: "normal"
});

export {
    inter,
    rubik,
    kanit,
    nunito,
    poppins,
    roboto,
    rubik500,
    kanit500,
    ubuntu700,
    roboto700,
    mukta700,
    outfit,
};