import { useQueryClient } from "@tanstack/react-query";

export const useGetFetchQuery = (query: string[]): any => {
    const queryClient = useQueryClient();

    const data = queryClient.getQueryData(query);

    return data;
};