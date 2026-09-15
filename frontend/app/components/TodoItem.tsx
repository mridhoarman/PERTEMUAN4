"use client";

import Link from "next/link";
import { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div
      className={`group relative mb-3 overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
        todo.completed
          ? "border-emerald-100 bg-emerald-50/40"
          : "border-slate-200 bg-white hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
      }`}
    >
      <div className="flex items-center gap-4">

        {/* CHECKBOX */}
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
            todo.completed
              ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200"
              : "border-slate-200 bg-slate-50 text-transparent hover:border-blue-400 hover:bg-blue-50"
          }`}
          aria-label="Toggle task"
        >
          ✓
        </button>

        {/* TASK INFO */}
        <div className="min-w-0 flex-1">

          <h3
            className={`truncate text-base font-bold transition sm:text-lg ${
              todo.completed
                ? "text-slate-400 line-through"
                : "text-slate-800"
            }`}
          >
            {todo.title}
          </h3>

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
                ? "Selesai"
                : "Proses"}
            </p>

          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex shrink-0 gap-2">

          <Link
            href={`/task/${todo.id}`}
            className="hidden rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:block"
          >
            Detail
          </Link>

          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            Hapus
          </button>

        </div>

      </div>
    </div>
  );
}