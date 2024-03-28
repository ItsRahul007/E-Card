import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface I_useSetCartItems {
    productId: string,
    method: "post" | "delete";
}

export function useGetCartItems() {
    async function getCartItems() {
        const res = await axios.get("/api/cart");
        return res.data;
    };

    const {
        data,
        refetch,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["get-cart-items"],
        queryFn: getCartItems,
    });

    return {
        data,
        refetch,
        isError,
        error,
        isLoading
    };
}

export function useSetCartItems() {
    const updateAddress = async ({ productId, method }: I_useSetCartItems) => {
        const response = await axios({
            method,
            url: `/api/cart`,
            data: { productId },
        });
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: updateAddress,
        mutationKey: ["get-cart-items"]
    });

    return mutation;
};