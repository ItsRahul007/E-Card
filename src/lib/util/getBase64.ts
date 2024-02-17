import { getPlaiceholder } from "plaiceholder";

export default async function getBase64(url: string): Promise<{ success: boolean; src: string; }> {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return { success: false, src: "" }
        };

        const buffer = await res.arrayBuffer();
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));
        console.log(base64);

        return { success: true, src: base64 };
    } catch (error) {
        console.log(error);
        return { success: false, src: "" };
    }
}