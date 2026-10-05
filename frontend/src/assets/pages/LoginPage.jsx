import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../components/Button";
import { loginPengguna } from "../services/penggunaService";

function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pengguna: "",
    kata_sandi: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    // Validasi sederhana
    if (!form.pengguna || !form.kata_sandi) {
      setError("Username dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      // Login melalui service
      const data = await loginPengguna(form);

      console.log("LOGIN BERHASIL:", data);

      // Simpan data pengguna ke localStorage
      localStorage.setItem("pengguna", JSON.stringify(data.pengguna));

      // Pindah ke dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("ERROR LOGIN:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* =========================
            BAGIAN KIRI
        ========================= */}
        <div className="hidden w-1/2 bg-gray-900 p-12 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="mx-auto max-w-md">
            <h1 className="text-4xl font-bold">Duitku</h1>

            <p className="mt-4 text-xl font-medium">
              Kelola keuanganmu dengan lebih mudah.
            </p>

            <p className="mt-3 leading-relaxed text-gray-300">
              Duitku membantu kamu mencatat, mengelola, dan memantau transaksi
              keuangan dalam satu aplikasi sederhana.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900">
                  ✓
                </div>

                <span>Catat pemasukan dan pengeluaran</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900">
                  ✓
                </div>

                <span>Kelola transaksi dengan mudah</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900">
                  ✓
                </div>

                <span>Pantau keuangan dalam satu tempat</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            BAGIAN KANAN
        ========================= */}
        <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* Logo untuk mobile */}
            <div className="mb-8 lg:hidden">
              <h1 className="text-3xl font-bold text-gray-900">Duitku</h1>

              <p className="mt-2 text-sm text-gray-500">
                Kelola keuanganmu dengan lebih mudah.
              </p>
            </div>

            {/* Card Login */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Selamat datang kembali
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Masuk ke akun Duitku kamu.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* USERNAME */}
                <div>
                  <label
                    htmlFor="pengguna"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Username
                  </label>

                  <input
                    id="pengguna"
                    name="pengguna"
                    type="text"
                    value={form.pengguna}
                    onChange={handleChange}
                    placeholder="Masukkan username"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="kata_sandi"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="kata_sandi"
                    name="kata_sandi"
                    type="password"
                    value={form.kata_sandi}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* BUTTON LOGIN */}
                <Button
                  variant="red"
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </form>

              {/* REGISTER */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-gray-800 hover:underline"
                >
                  Daftar sekarang
                </Link>
              </div>
            </div>

            {/* FOOTER */}
            <p className="mt-6 text-center text-xs text-gray-400">
              © 2026 Duitku. Kelola keuangan dengan lebih teratur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
