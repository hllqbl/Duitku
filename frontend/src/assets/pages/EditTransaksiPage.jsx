import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

import {
  getTransaksiById,
  updateTransaksi,
} from "../services/transaksiService";

function EditTransaksiPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tipe: "",
    jumlah: "",
    kategori: "",
    deskripsi: "",
    tanggal: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Ambil data transaksi berdasarkan ID
  useEffect(() => {
    async function fetchTransaksi() {
      try {
        setLoading(true);

        const data = await getTransaksiById(id);

        console.log("DATA TRANSAKSI:", data);

        setForm({
          tipe: data.tipe,
          jumlah: data.jumlah,
          kategori: data.kategori,
          deskripsi: data.deskripsi,
          tanggal: data.tanggal.slice(0, 10),
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaksi();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    const data = {
      tipe: form.tipe,
      jumlah: Number(form.jumlah),
      kategori: form.kategori,
      deskripsi: form.deskripsi,
      tanggal: form.tanggal,
    };

    try {
      setSaving(true);

      const result = await updateTransaksi(id, data);

      console.log("HASIL UPDATE:", result);

      alert("Transaksi berhasil diperbarui");

      navigate("/transaksi");
    } catch (err) {
      console.error("ERROR UPDATE:", err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p>Loading transaksi...</p>;
  }

  if (error) {
    return <p>Gagal mengambil transaksi: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64">
        <Navbar />

        <main className="p-8">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Edit Transaksi
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Ubah data transaksi keuangan
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
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
                    value={form.deskripsi}
                    onChange={handleChange}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
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
                  onClick={() => navigate("/transaksi")}
                >
                  Batal
                </Button>

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

export default EditTransaksiPage;
