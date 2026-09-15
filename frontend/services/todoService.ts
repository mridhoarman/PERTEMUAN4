import { apiClient } from "./api";
import { DummyJsonTodo, DummyJsonTodoResponse, TodoMutationPayload } from "@/types/api-todo";

export async function fetchTodos(limit = 10, skip = 0) {
  return apiClient<DummyJsonTodoResponse>(`/todos?limit=${limit}&skip=${skip}`);
}

export async function createTodo(payload: TodoMutationPayload) {
  return apiClient<DummyJsonTodo>("/todos/add", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTodo(id: number, payload: TodoMutationPayload) {
  return apiClient<DummyJsonTodo>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
