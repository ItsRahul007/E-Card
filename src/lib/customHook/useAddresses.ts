import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

type T_InputValues = {
    full_name: string;
    phone_number: number | string;
    address: string;
    _id?: string;
}

interface I_useSetAddresses {
    addresses: T_InputValues,
    method: "post" | "put" | "delete";
}

export function useGetAddresses() {
    async function getAddresses() {
        const res = await axios.get("/api/address");
        return res.data;
    };

    const {
        data,
        refetch,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["get-addresses"],
        queryFn: getAddresses,
    });

    return {
        data,
        refetch,
        isError,
        error,
        isLoading
    };
}

export function useSetAddresses() {
    const updateAddress = async ({ addresses, method }: I_useSetAddresses) => {
        const response = await axios({
            method,
            url: `/api/address`,
            data: { addresses },
        });
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: updateAddress,
        mutationKey: ["get-addresses"]
    });

    return mutation;
};