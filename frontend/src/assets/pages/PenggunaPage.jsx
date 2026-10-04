import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Button from "../components/Button";

import { getPenggunaById, updatePengguna } from "../services/penggunaService";

function PenggunaPage() {
  const [form, setForm] = useState({
    pengguna: "",
    kata_sandi: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // AMBIL DATA PENGGUNA
  // =========================

  useEffect(() => {
    async function fetchPengguna() {
      try {
        setLoading(true);
        setError("");

        const data = await getPenggunaById(2);

        console.log("DATA PENGGUNA:", data);

        setForm({
          pengguna: data.pengguna,
          kata_sandi: data.kata_sandi,
        });
      } catch (err) {
        console.error("ERROR GET PENGGUNA:", err);

        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPengguna();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // =========================
  // UPDATE PENGGUNA
  // =========================

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    setError("");
    setSuccess("");

    if (!form.pengguna) {
      setError("Username harus diisi.");
      return;
    }

    if (!form.kata_sandi) {
      setError("Password harus diisi.");
      return;
    }

    try {
      setSaving(true);

      const data = {
        pengguna: form.pengguna,
        kata_sandi: form.kata_sandi,
      };

      const result = await updatePengguna(2, data);

      console.log("HASIL UPDATE PENGGUNA:", result);

      setSuccess("Profil berhasil diperbarui.");
    } catch (err) {
      console.error("ERROR UPDATE PENGGUNA:", err);

      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />

        <div className="ml-64">
          <Navbar />

          <main className="p-8">
            <p className="text-gray-600">Loading profil...</p>
          </main>

          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-8">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Profil Pengguna
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Kelola informasi akun Anda
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
                {success}
              </div>
            )}

            {/* Profile Card */}
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="space-y-5">
                {/* Avatar */}
                <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-xl font-bold text-white">
                    {form.pengguna
                      ? form.pengguna.charAt(0).toUpperCase()
                      : "U"}
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {form.pengguna || "Pengguna"}
                    </h2>

                    <p className="text-sm text-gray-500">Akun Duitku</p>
                  </div>
                </div>

                {/* Username */}
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

                {/* Password */}
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
              </div>

              {/* Button */}
              <div className="mt-6 flex justify-end border-t border-gray-100 pt-5">
                <Button variant="red" type="submit" disabled={saving}>
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default PenggunaPage;
