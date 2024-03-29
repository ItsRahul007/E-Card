import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface I_useSetCartItems {
    productId: string,
    ratingNumber: number;
    comment: string;
    method: "post" | "delete";
}

export function useGetReviewAndComments(id: string) {
    async function getReviewAndComments() {
        const res = await axios.get("/api/review?productId=" + id);
        return res.data;
    };

    const {
        data,
        refetch,
        isError,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["review-and-comments"],
        queryFn: getReviewAndComments,
    });

    return {
        data,
        refetch,
        isError,
        error,
        isLoading
    };
}

export function useSetReviewAndComments() {
    const updateAddress = async ({ productId, ratingNumber, comment, method }: I_useSetCartItems) => {
        const response = await axios({
            method,
            url: `/api/review`,
            data: { productId, ratingNumber, comment },
        });
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: updateAddress,
        mutationKey: ["review-and-comments"]
    });

    return mutation;
};