"use server";
import { revalidatePath } from "next/cache";

type revalidateProfileProps = {
  revalidatePathUrl: string;
  revalidateLayout?: "layout" | "page";
};

export async function revalidateUrl({
  revalidatePathUrl,
  revalidateLayout,
}: revalidateProfileProps) {
  revalidateLayout
    ? revalidatePath(revalidatePathUrl, revalidateLayout)
    : revalidatePath(revalidatePathUrl);
}
