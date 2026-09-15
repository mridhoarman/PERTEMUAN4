"use client";

import Link from "next/link";
import TodoForm from "@/app/components/TodoForm";
import TodoList from "@/app/components/TodoList";
import { Todo } from "@/types/todo";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const CACHE_KEY = "TODO_LIST_CACHE";

type TodoCachedAppProps = { initialTodos: Todo[] };

export default function TodoCachedApp({ initialTodos }: TodoCachedAppProps) {
  const [todos, setTodos] = useLocalStorage<Todo[]>(CACHE_KEY, initialTodos);

  function handleAddTodo(title: string) {
    setTodos((current) => [
      {
        id: Date.now(),
        title,
        description: "Tugas baru dari localStorage.",
        completed: false,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);
  }

  function handleToggleTodo(id: number) {
    setTodos((current) => current.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }

  function handleDeleteTodo(id: number) {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  function handleReset() {
    setTodos(initialTodos);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <header className="border-b border-slate-100 px-6 py-7 sm:px-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Todo List — Local Storage</h1>
                <p className="mt-1 text-sm text-slate-500">Data disimpan di browser sehingga tetap ada setelah refresh.</p>
              </div>
              <Link href="/" className="w-fit rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">← State Only</Link>
            </div>
          </header>
          <div className="px-6 py-8 sm:px-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">● Caching aktif</span>
              <button onClick={handleReset} className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Reset Data</button>
            </div>
            <div className="mb-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-4"><TodoForm onAddTodo={handleAddTodo} /></div>
            <TodoList todos={todos} onToggleTodo={handleToggleTodo} onDeleteTodo={handleDeleteTodo} />
          </div>
        </div>
      </div>
    </main>
  );
}
