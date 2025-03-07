import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { fetchData, fetchDetailData } from "../api/todos";

export const useTodoQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.TODOLIST],
    queryFn: fetchData,
  });
};

export const useTodoDetailQuery = (id) => {
  return useQuery({
    queryKey: [QUERY_KEY.TODOLIST, id],
    queryFn: () => fetchDetailData(id),
  });
};
