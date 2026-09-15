import React from "react";
import Link from "next/link";

type TaskNotFoundProps = {
  id: string;
};

export default function TaskNotFound({ id }: TaskNotFoundProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto py-10">
        <div className="p-6 border bg-white rounded-xl shadow-lg border-gray-100 text-center">
          <h1 className="text-xl font-bold text-gray-800">
            Tugas Tidak Ditemukan
          </h1>

          <p className="text-gray-500 mb-6">
            Tugas dengan ID {id} tidak ada dalam daftar data.
          </p>

          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
          >
            Kembali ke Daftar Tugas
          </Link>
        </div>
      </div>
    </main>
  );
}