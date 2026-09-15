import { getTodos } from "@/lib/todos";
import TodoCachedApp from "./components/TodoCachedApp";

export default async function CachedPage() {
  const initialTodos = await getTodos();
  return <TodoCachedApp initialTodos={initialTodos} />;
}
