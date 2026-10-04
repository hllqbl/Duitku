import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

import { createTransaksi } from "../services/transaksiService";

function TambahTransaksiPage() {
  const [form, setForm] = useState({
    tipe: "",
    jumlah: "",
    kategori: "",
    deskripsi: "",
    tanggal: "",
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

    if (loading) return;

    // Bersihkan error sebelumnya
    setError("");

    // =========================
    // VALIDASI FRONTEND
    // =========================

    if (!form.tipe) {
      setError("Tipe transaksi harus dipilih.");
      return;
    }

    if (!form.jumlah) {
      setError("Jumlah harus diisi.");
      return;
    }

    if (Number(form.jumlah) <= 0) {
      setError("Jumlah harus lebih dari 0.");
      return;
    }

    if (!form.kategori) {
      setError("Kategori harus dipilih.");
      return;
    }

    if (!form.tanggal) {
      setError("Tanggal harus diisi.");
      return;
    }

    // =========================
    // DATA YANG DIKIRIM KE API
    // =========================

    const data = {
      ...form,
      pengguna_id: 2,
      jumlah: Number(form.jumlah),
    };

    try {
      setLoading(true);

      const result = await createTransaksi(data);

      console.log("HASIL POST:", result);
      console.log("Transaksi berhasil dibuat");

      // Reset form setelah berhasil
      setForm({
        tipe: "",
        jumlah: "",
        kategori: "",
        deskripsi: "",
        tanggal: "",
      });
    } catch (err) {
      console.error("ERROR POST:", err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                Tambah Transaksi
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Tambahkan transaksi keuangan baru
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                {/* Tipe */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Tipe Transaksi
                  </label>

                  <div className="flex gap-4">
                    <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="tipe"
                        value="pemasukan"
                        checked={form.tipe === "pemasukan"}
                        onChange={handleChange}
                      />

                      <span className="text-sm text-gray-700">Pemasukan</span>
                    </label>

                    <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                      <input
                        type="radio"
                        name="tipe"
                        value="pengeluaran"
                        checked={form.tipe === "pengeluaran"}
                        onChange={handleChange}
                      />

                      <span className="text-sm text-gray-700">Pengeluaran</span>
                    </label>
                  </div>
                </div>

                {/* Jumlah */}
                <div>
                  <label
                    htmlFor="jumlah"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Jumlah
                  </label>

                  <input
                    id="jumlah"
                    name="jumlah"
                    type="number"
                    min="1"
                    placeholder="Contoh: 50000"
                    value={form.jumlah}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label
                    htmlFor="kategori"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Kategori
                  </label>

                  <select
                    id="kategori"
                    name="kategori"
                    value={form.kategori}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="gaji">Gaji</option>
                    <option value="makanan">Makanan</option>
                    <option value="transportasi">Transportasi</option>
                    <option value="belanja">Belanja</option>
                    <option value="hiburan">Hiburan</option>
                    <option value="tagihan">Tagihan</option>
                    <option value="freelance">Freelance</option>
                    <option value="bonus">Bonus</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Deskripsi */}
                <div>
                  <label
                    htmlFor="deskripsi"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Deskripsi
                  </label>

                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    rows="3"
                    placeholder="Contoh: Makan siang"
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  ></textarea>
                </div>

                {/* Tanggal */}
                <div>
                  <label
                    htmlFor="tanggal"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Tanggal
                  </label>

                  <input
                    id="tanggal"
                    name="tanggal"
                    type="date"
                    value={form.tanggal}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                <Button
                  variant="gray"
                  type="button"
                  onClick={() => window.history.back()}
                >
                  Batal
                </Button>

                <Button variant="red" type="submit" disabled={loading}>
                  {loading ? "Menyimpan..." : "Simpan"}
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

export default TambahTransaksiPage;
