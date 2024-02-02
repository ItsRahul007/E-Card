import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

type itemProps = {
    imgUrl: string;
    product_name: string;
    product_category: string;
    price: string | number;
    product_type: string;
    search_keys: string[] | string;
    brand_name: string;
};

type T_useFetchProducts = { query: string[], searchKey: string };

export default function useFetchProducts({ query, searchKey }: T_useFetchProducts) {
    async function getProducts({ pageParam }: { pageParam: number }) {
        const res = await fetch('/api/product?page=' + pageParam, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN || "")
            },
        })
        const data = await res.json();
        return { ...data }
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
    const allProducts: itemProps[] = data?.pages.reduce((acc, page) => {
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