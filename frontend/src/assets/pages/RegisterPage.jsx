import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Button from "../components/Button";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    pengguna: "",
    kata_sandi: "",
  });

  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

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

    // Validasi username
    if (!form.pengguna) {
      setError("Username wajib diisi.");
      return;
    }

    // Validasi password
    if (!form.kata_sandi) {
      setError("Password wajib diisi.");
      return;
    }

    // Validasi konfirmasi password
    if (form.kata_sandi !== konfirmasiPassword) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/pengguna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registrasi gagal");
      }

      console.log("REGISTER BERHASIL:", data);

      alert("Registrasi berhasil. Silakan login.");

      navigate("/login");
    } catch (err) {
      console.error("ERROR REGISTER:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* BAGIAN KIRI */}
        <div className="hidden w-1/2 bg-gray-900 p-12 text-white lg:flex lg:flex-col lg:justify-center">
          <div className="mx-auto max-w-md">
            <h1 className="text-4xl font-bold">Duitku</h1>

            <p className="mt-4 text-xl font-medium">
              Mulai kelola keuanganmu hari ini.
            </p>

            <p className="mt-3 leading-relaxed text-gray-300">
              Buat akun Duitku dan mulai mencatat pemasukan serta pengeluaranmu
              dengan lebih teratur.
            </p>

            <div className="mt-8 rounded-xl border border-gray-700 bg-gray-800 p-5">
              <p className="text-sm leading-relaxed text-gray-300">
                "Dengan mencatat transaksi secara rutin, kamu dapat lebih mudah
                memahami ke mana uangmu pergi."
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN */}
        <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
          <div className="w-full max-w-md">
            {/* MOBILE BRANDING */}
            <div className="mb-8 lg:hidden">
              <h1 className="text-3xl font-bold text-gray-900">Duitku</h1>

              <p className="mt-2 text-sm text-gray-500">
                Mulai kelola keuanganmu hari ini.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Buat akun</h2>

                <p className="mt-2 text-sm text-gray-500">
                  Daftar untuk mulai menggunakan Duitku.
                </p>
              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

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
                    placeholder="Buat username"
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
                    placeholder="Buat password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* KONFIRMASI PASSWORD */}
                <div>
                  <label
                    htmlFor="konfirmasiPassword"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Konfirmasi Password
                  </label>

                  <input
                    id="konfirmasiPassword"
                    type="password"
                    value={konfirmasiPassword}
                    onChange={(e) => setKonfirmasiPassword(e.target.value)}
                    placeholder="Ulangi password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* BUTTON */}
                <Button
                  variant="red"
                  type="submit"
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Mendaftarkan..." : "Daftar"}
                </Button>
              </form>

              {/* LOGIN */}
              <div className="mt-6 text-center text-sm text-gray-500">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-gray-800 hover:underline"
                >
                  Masuk sekarang
                </Link>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-gray-400">
              © 2026 Duitku. Kelola keuangan dengan lebih teratur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
