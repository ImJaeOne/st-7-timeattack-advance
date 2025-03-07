import axios from "axios";

export const todoApi = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchData = async () => {
  const { data, err } = await todoApi.get("/todos");

  if (err) {
    throw new Error(err);
  }

  return data;
};

export const addData = async (newTodo) => {
  const { err } = await todoApi.post("/todos", newTodo);

  if (err) {
    throw new Error(err);
  }
};

export const fetchDetailData = async (id) => {
  const { data, err } = await todoApi(`/todos/${id}`);

  if (err) {
    throw new Error(err);
  }

  return data;
};
