import { NextRequest, NextResponse } from "next/server";
import { createTodo } from "@/services/todoService";
import { getTasks } from "@/lib/tasks";
import { ApiResponse } from "@/types/api-todo";

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
    const limit = Number(request.nextUrl.searchParams.get("limit") ?? "10");
    const data = await getTasks(page, limit);
    const response: ApiResponse<typeof data> = { success: true, data };
    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal mengambil data tugas.";
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title.trim() : "";
    if (!title) {
      return NextResponse.json<ApiResponse<never>>({ success: false, error: "Title wajib diisi." }, { status: 400 });
    }

    const created = await createTodo({ todo: title, completed: false, userId: 1 });
    return NextResponse.json<ApiResponse<typeof created>>({ success: true, data: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal membuat tugas.";
    return NextResponse.json<ApiResponse<never>>({ success: false, error: message }, { status: 500 });
  }
}
