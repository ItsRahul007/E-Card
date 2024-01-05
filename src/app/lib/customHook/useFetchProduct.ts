import { useInfiniteQuery } from "@tanstack/react-query";


export default function useFetchProducts() {
    async function getProducts({ pageParam }: { pageParam: number }) {
        const res = await fetch('/api/product?page=' + pageParam, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                AUTH_TOKEN: JSON.stringify(process.env.NEXT_PUBLIC_AUTH_TOKEN)
            }
        })
        const data = await res.json();
        return { ...data }
    };

    const {
        data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, status, isFetching
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: getProducts,
        initialPageParam: 1,

        getNextPageParam: (lastPage, allPages) => {
            const nextPage =
                lastPage.success && lastPage.products.length ? allPages.length + 1 : undefined;
            return nextPage;
        },
    });

    const allProducts =  data?.pages.reduce((acc, page) => [...acc, ...page.products], []);

    return {
        allProducts,
        error,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        status,
        isFetching,
    }

};