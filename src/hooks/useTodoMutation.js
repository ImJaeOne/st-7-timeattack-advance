import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

export const useTodoMutation = () => {
  const queryClient = useQueryClient();

  const useToggleTodo = () => {
    const mutation = useMutation({
      mutationKey: ["todos"],
      mutationFn: ({ id, currentLiked }) =>
        todoApi.patch(`/todos/${id}`, {
          liked: !currentLiked,
        }),
      onMutate: ({ id }) => {
        queryClient.cancelQueries(["todos"]);
        const prevTodoList = queryClient.getQueryData({
          queryKey: ["todos"],
        });
        queryClient.setQueryData(["todos"], (prev) =>
          prev.map((todo) => {
            return todo.id === id ? { ...todo, liked: !todo.liked } : todo;
          })
        );
        return () => queryClient.setQueryData(["todos"], prevTodoList);
      },
      onSettled: (_, error, __, rollback) => {
        if (error && rollback) {
          rollback();
        }
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });

    return mutation;
  };

  return { useToggleTodo };
};
