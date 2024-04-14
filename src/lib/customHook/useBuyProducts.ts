import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { T_orderObj } from "../types/orderTypes";

export function useOrderMutation() {
    const setOrder = async (orderObject: T_orderObj) => {
        const response = await axios.post(`/api/buy-products`, orderObject);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: setOrder,
        mutationKey: ["place-order"]
    });

    return mutation;
};

export function useSetIsPaid() {
    const setIsPaid = async (orderId: string) => {
        const response = await axios.put(`/api/buy-products`, { is_paid: true, orderId });
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: setIsPaid,
        mutationKey: ["place-order"]
    });

    return mutation;
}