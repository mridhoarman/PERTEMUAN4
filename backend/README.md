# Todo App - Backend (Tugas #4)

REST API untuk todo-app menggunakan Express + TypeScript + MySQL + JWT,
sesuai modul "Tugas #4 Frontend-Backend Developer Documentation".

## Struktur folder

```
backend/
├── src/
│   ├── config/db.ts            # connection pool MySQL
│   ├── models/userModel.ts     # query SQL untuk user
│   ├── models/todoModel.ts     # query SQL untuk todo
│   ├── middlewares/validator.ts       # validasi body request
│   ├── middlewares/authMiddleware.ts  # verifikasi JWT
│   ├── controllers/authController.ts  # register & login
│   ├── controllers/todoController.ts  # get & create todo
│   ├── routes/api.ts           # daftar semua route
│   ├── app.ts                  # konfigurasi Express
│   └── server.ts               # entry point
├── todo_db.sql                 # script buat database & tabel
├── .env                        # kredensial (JANGAN di-commit ke git)
├── package.json
└── tsconfig.json
```

## Cara menjalankan

1. Jalankan MySQL (via XAMPP), lalu buka phpMyAdmin → tab SQL → paste isi
   `todo_db.sql` → klik **Go**.
2. Sesuaikan isi `.env` jika perlu (host/user/password DB kamu).
3. Install dependencies:
   ```
   npm install
   ```
4. Jalankan server (auto-restart dengan tsx watch):
   ```
   npm run dev
   ```
5. Server berjalan di `http://localhost:5000`.

## Endpoint

| Method | Endpoint            | Auth         | Body                              |
|--------|----------------------|--------------|-------------------------------------|
| POST   | /api/auth/register  | -            | `{ username, email, password }`   |
| POST   | /api/auth/login      | -            | `{ username, password }`          |
| GET    | /api/todos           | Bearer Token | -                                  |
| POST   | /api/todos            | Bearer Token | `{ task }`                        |

Test di Postman sesuai langkah 5 pada modul (register → login → simpan
token ke variabel `{{jwt_token}}` → test GET/POST `/api/todos` dengan
Authorization: Bearer Token).
