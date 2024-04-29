import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { T_orderObj } from "../types/orderTypes";

export function useGetOrders() {
    async function getOrders() {
        const res = await axios.get("/api/buy-products");
        return res.data;
    };

    const {
        data,
        refetch,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    return {
        data,
        refetch,
        isError,
        error,
        isLoading
    };
}

export function useOrderMutation() {
    const setOrder = async (orderObject: T_orderObj) => {
        const response = await axios.post(`/api/buy-products`, orderObject);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: setOrder,
        mutationKey: ["orders"]
    });

    return mutation;
};

type PropsType = {
    order: string,
    payment_status: string
};

export function useSetIsPaid() {
    const setIsPaid = async ({ order, payment_status }: PropsType) => {
        const response = await axios.put(`/api/buy-products`, { order, payment_status });
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: setIsPaid,
        mutationKey: ["orders"]
    });

    return mutation;
};

export function useCancleOrder() {
    const deleteOrder = async (_id: string) => {
        const response = await axios({
            method: 'delete',
            url: `/api/buy-products`,
            data: { _id },
        });
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: deleteOrder,
        mutationKey: ["orders"]
    });

    return mutation;
}