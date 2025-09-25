import { useQueryClient } from "@tanstack/react-query";

export const useQueryAction = () => {
  const queryClient = useQueryClient();
  const invalidateQuery = (key: string[]) => {
    return queryClient.invalidateQueries({ queryKey: key });
  };
  return { invalidateQuery };
};
