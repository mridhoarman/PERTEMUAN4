"use client";

import { FormEvent, useState } from "react";

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    onAddTodo(trimmedTitle);
    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-2xl text-white shadow-md sm:flex">
        +
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tambahkan tugas baru..."
        className="h-14 flex-1 rounded-xl border border-slate-200 bg-white px-5 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="h-14 rounded-xl bg-blue-600 px-8 text-base font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Tambah
      </button>
    </form>
  );
}
