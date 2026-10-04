import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllTransaksi, deleteTransaksi } from "../services/transaksiService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import Button from "../components/Button";

function TransaksiPage() {
  const navigate = useNavigate();

  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransaksi() {
      setLoading(true);
      setError(null);

      try {
        const data = await getAllTransaksi();

        console.log("DATA DARI API:", data);

        setTransaksi(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaksi();
  }, []);

  function formatTanggal(tanggal) {
    return new Date(tanggal).toLocaleDateString("id-ID");
  }

  function formatRupiah(jumlah) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(jumlah);
  }

  async function handleDelete(id) {
    const yakin = window.confirm("Yakin ingin menghapus transaksi ini?");

    if (!yakin) return;

    try {
      await deleteTransaksi(id);

      setTransaksi((prev) => prev.filter((item) => item.id_transaksi !== id));

      console.log("Transaksi berhasil dihapus");
    } catch (err) {
      console.error("ERROR DELETE:", err);

      setError(err.message);
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
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Transaksi</h1>

            <p className="mt-1 text-sm text-gray-500">
              Daftar transaksi keuangan
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Tanggal</th>

                  <th className="px-4 py-3 font-semibold">Kategori</th>

                  <th className="px-4 py-3 font-semibold">Tipe</th>

                  <th className="px-4 py-3 font-semibold">Jumlah</th>

                  <th className="px-4 py-3 font-semibold">Deskripsi</th>

                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {transaksi.map((item) => (
                  <tr
                    key={item.id_transaksi}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{formatTanggal(item.tanggal)}</td>

                    <td className="px-4 py-3">{item.kategori}</td>

                    <td className="px-4 py-3">{item.tipe}</td>

                    <td className="px-4 py-3 font-medium">
                      {formatRupiah(item.jumlah)}
                    </td>

                    <td className="px-4 py-3 text-gray-600">
                      {item.deskripsi}
                    </td>

                    {/* Aksi */}
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Button
                          variant="gray"
                          type="button"
                          onClick={() =>
                            navigate(`/transaksi/edit/${item.id_transaksi}`)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="red"
                          type="button"
                          onClick={() => handleDelete(item.id_transaksi)}
                        >
                          Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default TransaksiPage;
