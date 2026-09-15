import { Todo } from "@/types/todo";
import { fetchTodos } from "@/services/todoService";
import { apiClient } from "@/services/api";
import { DummyJsonTodo } from "@/types/api-todo";
export function formatTodo(todo: DummyJsonTodo): Todo {
  return {
    id: todo.id,
    title: todo.todo,
    description: `Todo dari DummyJSON untuk user #${todo.userId}.`,
    completed: todo.completed,
    createdAt: new Date().toISOString().slice(0, 10),
  };
}

export async function getTasks(page = 1, limit = 10) {
  const safePage = Math.max(1, page);
  const skip = (safePage - 1) * limit;
  const response = await fetchTodos(limit, skip);
  return {
    todos: response.todos.map(formatTodo),
    total: response.total,
    page: safePage,
    limit,
  };
}

export async function getTaskById(id: number) {
  try {
    const todo = await apiClient<DummyJsonTodo>(`/todos/${id}`);
    return formatTodo(todo);
  } catch {
    return null;
  }
}

export function getTaskStats(todos: Todo[]) {
  const completed = todos.filter((todo) => todo.completed).length;
  return { total: todos.length, completed, pending: todos.length - completed };
}
