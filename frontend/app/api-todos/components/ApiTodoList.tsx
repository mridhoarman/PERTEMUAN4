"use client";

import { useState } from "react";
import { Todo } from "@/types/todo";

type ApiTodoListProps = {
  initialTodos: Todo[];
};

export default function ApiTodoList({
  initialTodos,
}: ApiTodoListProps) {
  const [todos, setTodos] = useState(initialTodos);
  const [loading, setLoading] = useState<number | null>(null);

  async function toggleTodo(id: number) {
    const current = todos.find((todo) => todo.id === id);

    if (!current) return;

    const nextCompleted = !current.completed;

    // Optimistic Update
    setTodos((items) =>
      items.map((todo) =>
        todo.id === id
          ? { ...todo, completed: nextCompleted }
          : todo
      )
    );

    setLoading(id);

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: nextCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Request gagal");
      }
    } catch {
      // Rollback jika API gagal
      setTodos((items) =>
        items.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: current.completed,
              }
            : todo
        )
      );

      alert("Gagal menyimpan perubahan ke API.");
    } finally {
      setLoading(null);
    }
  }

  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <div className="mb-3 text-3xl">📋</div>

        <p className="font-semibold text-slate-700">
          Tidak ada data tugas
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Belum ada tugas yang tersedia dari API.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {todos.map((todo) => {

        const isLoading = loading === todo.id;

        return (
          <div
            key={todo.id}
            className={`group relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
              todo.completed
                ? "border-emerald-100 bg-emerald-50/40"
                : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
            }`}
          >

            <div className="flex items-center gap-4">

              {/* CHECKBOX */}
              <button
                type="button"
                onClick={() => toggleTodo(todo.id)}
                disabled={isLoading}
                aria-label={
                  todo.completed
                    ? "Batalkan tugas"
                    : "Selesaikan tugas"
                }
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all duration-300 ${
                  todo.completed
                    ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                    : "border-slate-200 bg-slate-50 text-transparent hover:border-blue-400 hover:bg-blue-50"
                } ${
                  isLoading
                    ? "cursor-wait opacity-60"
                    : "cursor-pointer"
                }`}
              >
                ✓
              </button>

              {/* CONTENT */}
              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-2">

                  <h3
                    className={`truncate text-base font-bold sm:text-lg ${
                      todo.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {todo.title}
                  </h3>

                </div>

                <div className="mt-1 flex items-center gap-2">

                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      todo.completed
                        ? "bg-emerald-500"
                        : "bg-blue-500"
                    }`}
                  />

                  <p
                    className={`text-xs font-medium ${
                      todo.completed
                        ? "text-emerald-600"
                        : "text-slate-400"
                    }`}
                  >
                    {todo.completed
                      ? "Task completed"
                      : "Task in progress"}
                  </p>

                  <span className="text-xs text-slate-300">
                    •
                  </span>

                  <p className="text-xs text-slate-400">
                    ID #{todo.id}
                  </p>

                </div>

              </div>

              {/* API STATUS */}
              <div className="hidden shrink-0 sm:block">

                {isLoading ? (
                  <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                    Menyimpan
                  </div>
                ) : (
                  <div
                    className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                      todo.completed
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    API Synced
                  </div>
                )}

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}