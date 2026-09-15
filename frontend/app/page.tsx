import { getTodos } from "@/lib/todos";
import TodoStateOnlyApp from "./components/TodoStateOnlyApp";

export default async function TodoPage() {
  const todos = await getTodos();
  return <TodoStateOnlyApp initialTodos={todos} />;
}
