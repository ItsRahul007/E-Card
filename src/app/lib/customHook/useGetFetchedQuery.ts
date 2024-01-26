import { useQueryClient } from "@tanstack/react-query";
import { ProductType } from "../types/productTyps";

type productQuery = {
    pageParams: number[];
    pages: {
        success: boolean;
        products: ProductType[] | [];
    }[];
    error?: string;
}

export const useGetFetchQuery = (query: string[]): any => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData(query);
};