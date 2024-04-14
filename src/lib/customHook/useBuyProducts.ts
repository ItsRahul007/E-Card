import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { T_orderObj } from "../types/orderTypes";

export function useOrderMutation() {
    const updateAddress = async (orderObject: T_orderObj) => {
        const response = await axios.post(`/api/buy-products`, orderObject);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: updateAddress,
        mutationKey: ["place-order"]
    });

    return mutation;
};