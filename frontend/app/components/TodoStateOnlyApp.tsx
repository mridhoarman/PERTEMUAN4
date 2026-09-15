"use client";

import { useState } from "react";
import Link from "next/link";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Todo } from "@/types/todo";

type TodoStateOnlyAppProps = {
  initialTodos: Todo[];
};

export default function TodoStateOnlyApp({
  initialTodos,
}: TodoStateOnlyAppProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  function handleAddTodo(title: string) {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description: "Tugas baru yang ditambahkan melalui form.",
      completed: false,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setTodos((current) => [newTodo, ...current]);
  }

  function handleToggleTodo(id: number) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function handleDeleteTodo(id: number) {
    setTodos((current) =>
      current.filter((todo) => todo.id !== id)
    );
  }

  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.length - completed;

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* TOP BAR */}
        <header className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-xl shadow-lg shadow-slate-300">
              ✓
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                Productivity
              </p>

              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                My Tasks
              </h1>
            </div>
          </div>

        </header>

        {/* HERO */}
        <section className="relative mb-6 overflow-hidden rounded-[30px] bg-slate-900 px-7 py-8 text-white shadow-2xl shadow-slate-300 sm:px-10 sm:py-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10">
            <p className="mb-2 text-sm font-medium text-blue-300">
              Haloo!!
            </p>

            <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Fokus pada tugas yang
              <span className="text-blue-400"> penting.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
              Atur pekerjaanmu, selesaikan satu per satu, dan tetap
              produktif setiap hari.
            </p>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">
                Total Tasks
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm">
                📋
              </span>
            </div>

            <p className="text-3xl font-bold text-slate-900">
              {todos.length}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Semua tugas kamu
            </p>
          </div>

          <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-600">
                Completed
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-sm">
                ✓
              </span>
            </div>

            <p className="text-3xl font-bold text-emerald-700">
              {completed}
            </p>

            <p className="mt-1 text-xs text-emerald-600/70">
              Tugas selesai
            </p>
          </div>

          <div className="rounded-[24px] border border-blue-100 bg-blue-50/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">
                In Progress
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-sm">
                ◷
              </span>
            </div>

            <p className="text-3xl font-bold text-blue-700">
              {pending}
            </p>

            <p className="mt-1 text-xs text-blue-600/70">
              Masih perlu dikerjakan
            </p>
          </div>

        </section>

        {/* MAIN CONTENT */}
        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">

          {/* FORM HEADER */}
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
              New task
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Tambahkan tugas baru
            </h2>
          </div>

          <TodoForm onAddTodo={handleAddTodo} />

          {/* TASK HEADER */}
          <div className="mt-9 mb-5 flex items-end justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Daftar Tugas
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Kelola semua pekerjaanmu di sini.
              </p>
            </div>

            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500">
              {todos.length} TASKS
            </div>

          </div>

          {/* TODO LIST */}
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />

        </section>

      </div>
    </main>
  );
}