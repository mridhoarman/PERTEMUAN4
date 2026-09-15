import { NextRequest, NextResponse } from "next/server";
import { apiClient } from "@/services/api";
import { formatTodo } from "@/lib/tasks";
import { ApiResponse, DummyJsonTodo } from "@/types/api-todo";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const todo = await apiClient<DummyJsonTodo>(`/todos/${id}`);
    return NextResponse.json<ApiResponse<ReturnType<typeof formatTodo>>>({ success: true, data: formatTodo(todo) });
  } catch (error) {
    const status = error instanceof Error && "status" in error ? Number((error as { status: number }).status) : 500;
    const message = error instanceof Error ? error.message : "Tugas tidak ditemukan.";
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: status === 404 ? 404 : 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await apiClient<DummyJsonTodo>(`/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ completed: Boolean(body.completed) }),
    });
    return NextResponse.json<ApiResponse<ReturnType<typeof formatTodo>>>({ success: true, data: formatTodo(updated) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal memperbarui tugas.";
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
