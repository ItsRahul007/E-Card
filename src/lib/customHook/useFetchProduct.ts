import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ProductType } from "../types/productTyps";
import axios from "axios";

type T_useFetchProducts = {
    query: string[];
    searchKey?: string;
    price?: string;
};

export default function useFetchProducts({ query, searchKey, price }: T_useFetchProducts) {
    async function getProducts({ pageParam }: { pageParam: number }) {
        const url = `/api/product?page=${pageParam}${searchKey ? `&search=${searchKey}` : ""}${price ? `&price=${price}` : ""}`;
        const res = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN || "")
            }
        });

        return res.data
    };

    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        status,
        isFetching,
        refetch,
    } = useInfiniteQuery({
        queryKey: query,
        queryFn: getProducts,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage =
                lastPage.success && lastPage.products.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });

    //? collecting all products array into one array
    const allProducts: ProductType[] = data?.pages.reduce((acc, page) => {
        if (page.success) return [...acc, ...page.products]
        else {
            toast.error(page.error);
            return [...acc];
        }
    }, []);

    return {
        allProducts,
        error,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        status,
        isFetching,
        refetch,
    }
};