import Link from "next/link";
import { getTasks, getTaskStats } from "@/lib/tasks";
import ApiTodoList from "./components/ApiTodoList";

export default async function ApiTodosPage() {
  const result = await getTasks(1, 10);
  const stats = getTaskStats(result.todos);

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-xl text-white shadow-lg">
              ✓
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                Daftar Tugas
              </p>

              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Todo List
              </h1>
            </div>

          </div>

          <div className="flex gap-2">

            <Link
              href="/"
              className="rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              State Only
            </Link>

            <Link
              href="/cached"
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Local Storage
            </Link>

          </div>
        </header>

        {/* HERO */}
        <section className="relative mb-6 overflow-hidden rounded-[30px] bg-slate-900 px-7 py-8 text-white shadow-2xl shadow-slate-300 sm:px-10 sm:py-10">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative z-10">

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              Data dari API
            </div>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Daftar Tugas
              <span className="text-blue-400"> dari DummyJSON</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Data tugas diambil dari DummyJSON API dan ditampilkan
              pada halaman daftar tugas.
            </p>

          </div>
        </section>

        {/* STATISTIK */}
        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* TOTAL */}
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-400">
                Total
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
                📋
              </span>
            </div>

            <p className="text-3xl font-bold text-slate-900">
              {stats.total}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Semua tugas
            </p>

          </div>

          {/* SELESAI */}
          <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-600">
                Selesai
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100">
                ✓
              </span>
            </div>

            <p className="text-3xl font-bold text-emerald-700">
              {stats.completed}
            </p>

            <p className="mt-1 text-xs text-emerald-600/70">
              Tugas selesai
            </p>

          </div>

          {/* BELUM SELESAI */}
          <div className="rounded-[24px] border border-blue-100 bg-blue-50/70 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">
                Belum Selesai
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100">
                ◷
              </span>
            </div>

            <p className="text-3xl font-bold text-blue-700">
              {stats.pending}
            </p>

            <p className="mt-1 text-xs text-blue-600/70">
              Masih perlu dikerjakan
            </p>

          </div>

        </section>

        {/* DAFTAR TUGAS */}
        <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">
                Data Tugas
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Daftar Tugas
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Kelola tugas yang tersedia dari API.
              </p>
            </div>

            <div className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600">
              {result.todos.length} TUGAS
            </div>

          </div>

          <ApiTodoList initialTodos={result.todos} />

        </section>

      </div>
    </main>
  );
}