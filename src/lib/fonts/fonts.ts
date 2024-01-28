import { Inter, Kanit, Mukta, Nunito, Poppins, Roboto, Rubik, Ubuntu } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });

const rubik = Rubik({
    weight: ["700", "500"],
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
    rubik500,
    kanit,
    kanit500,
    nunito,
    poppins,
    roboto,
    ubuntu700,
    roboto700,
    mukta700,
};