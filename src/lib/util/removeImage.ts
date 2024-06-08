"use server";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();
export const deleteFile = async (files: string[] | string) => {
  try {
    await utapi.deleteFiles(files);
    return { message: "Image deleted successfully", success: true };
  } catch (error: any) {
    console.log(error.message);
    return { message: "Failed to delete image", success: false };
  }
};
