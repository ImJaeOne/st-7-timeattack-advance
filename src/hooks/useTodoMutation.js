import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants/queryKey";
import { addData } from "../api/todos";

export const useTodoMutation = () => {
  const queryClinet = useQueryClient();
  const useAddTodo = () => {
    const mutation = useMutation({
      mutationKey: [QUERY_KEY.TODOLIST],
      mutationFn: (newTodo) => addData(newTodo),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: [QUERY_KEY.TODOLIST] });
      },
    });

    return mutation;
  };

  return { useAddTodo };
};
