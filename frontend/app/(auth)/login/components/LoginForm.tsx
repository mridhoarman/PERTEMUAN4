"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Username dan password wajib diisi!");
      return;
    }

    alert(`Login berhasil!\nSelamat datang, ${username}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">

          <h1>Login</h1>

          <p>
            Masuk Ke Akun Anda!
            <br />
            Silakan login untuk melanjutkan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword
                    ? "Sembunyikan password"
                    : "Tampilkan password"
                }
              >
                {showPassword ? "◉" : "◌"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button type="submit" className="auth-button">
            Login
          </button>

          {/* Links */}
          <div className="auth-links register-prompt">
            <span>Belum punya akun?</span>

            <Link href="/register">Register di sini!</Link>
          </div>
        </form>

        <div className="auth-footer">
          <p>Kelola tugas lebih mudah dan teratur.</p>
        </div>
      </div>
    </div>
  );
}