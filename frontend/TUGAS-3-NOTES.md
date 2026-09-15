# Tugas #3 Module PWF — Catatan Pengerjaan

Project ini merupakan kelanjutan dari Tugas Praktikum 2.

## Halaman yang ditambahkan
- `/` — State Only menggunakan `useState`
- `/cached` — Local Storage menggunakan custom hook `useLocalStorage`
- `/api-todos` — Fetch Data dari DummyJSON melalui API Route internal

## Struktur utama Tugas #3
- `app/components/TodoStateOnlyApp.tsx`
- `hooks/useLocalStorage.ts`
- `app/cached/components/TodoCachedApp.tsx`
- `app/cached/page.tsx`
- `types/api-todo.ts`
- `services/api.ts`
- `services/todoService.ts`
- `lib/tasks.ts`
- `app/api/todos/route.ts`
- `app/api/todos/[id]/route.ts`
- `app/api-todos/components/ApiTodoList.tsx`
- `app/api-todos/page.tsx`

## Pengujian sesuai modul
1. Jalankan `npm install` lalu `npm run dev`.
2. Buka `/` dan tambahkan/checklist/hapus tugas. Refresh untuk membuktikan state-only kembali ke data awal.
3. Buka `/cached`. Tambahkan/checklist tugas lalu refresh. Data tetap tersimpan. Buka tab kedua untuk menguji sinkronisasi.
4. Buka `/api-todos`. Centang tugas dan buka DevTools > Network untuk melihat request PATCH.
5. Refresh `/api-todos`. Data akan kembali ke kondisi API awal karena DummyJSON merupakan mock API dan perubahan tidak dipersistenkan.
