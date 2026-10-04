import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

import { getAllTransaksi } from "../services/transaksiService";

function DashboardPage() {
  const [transaksi, setTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil semua transaksi
  useEffect(() => {
    async function fetchTransaksi() {
      try {
        setLoading(true);
        setError(null);

        const data = await getAllTransaksi();

        console.log("DATA DASHBOARD:", data);

        setTransaksi(data);
      } catch (err) {
        console.error("ERROR DASHBOARD:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTransaksi();
  }, []);

  // =========================
  // HITUNG STATISTIK
  // =========================

  const totalPemasukan = transaksi
    .filter((item) => item.tipe === "pemasukan")
    .reduce((total, item) => total + Number(item.jumlah), 0);

  const totalPengeluaran = transaksi
    .filter((item) => item.tipe === "pengeluaran")
    .reduce((total, item) => total + Number(item.jumlah), 0);

  const saldo = totalPemasukan - totalPengeluaran;

  const jumlahTransaksi = transaksi.length;

  // Ambil 5 transaksi terbaru
  const transaksiTerbaru = [...transaksi]
    .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    .slice(0, 5);

  // =========================
  // FORMAT
  // =========================

  function formatRupiah(jumlah) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(jumlah);
  }

  function formatTanggal(tanggal) {
    return new Date(tanggal).toLocaleDateString("id-ID");
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
            <p className="text-gray-600">Loading dashboard...</p>
          </main>

          <Footer />
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />

        <div className="ml-64">
          <Navbar />

          <main className="p-8">
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
              Gagal mengambil data dashboard: {error}
            </div>
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            <p className="mt-1 text-sm text-gray-500">
              Ringkasan keuangan Anda
            </p>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Pemasukan */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Pemasukan
              </p>

              <p className="mt-2 text-2xl font-bold text-green-600">
                {formatRupiah(totalPemasukan)}
              </p>
            </div>

            {/* Pengeluaran */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Pengeluaran
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {formatRupiah(totalPengeluaran)}
              </p>
            </div>

            {/* Saldo */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Saldo</p>

              <p
                className={`mt-2 text-2xl font-bold ${
                  saldo >= 0 ? "text-gray-800" : "text-red-600"
                }`}
              >
                {formatRupiah(saldo)}
              </p>
            </div>

            {/* Jumlah Transaksi */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Jumlah Transaksi
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {jumlahTransaksi}
              </p>
            </div>
          </div>

          {/* Transaksi Terbaru */}
          <div className="mt-8">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Transaksi Terbaru
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Lima transaksi terakhir
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Tanggal</th>

                    <th className="px-4 py-3 font-semibold">Kategori</th>

                    <th className="px-4 py-3 font-semibold">Tipe</th>

                    <th className="px-4 py-3 font-semibold">Jumlah</th>

                    <th className="px-4 py-3 font-semibold">Deskripsi</th>
                  </tr>
                </thead>

                <tbody>
                  {transaksiTerbaru.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        Belum ada transaksi.
                      </td>
                    </tr>
                  ) : (
                    transaksiTerbaru.map((item) => (
                      <tr
                        key={item.id_transaksi}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          {formatTanggal(item.tanggal)}
                        </td>

                        <td className="px-4 py-3">{item.kategori}</td>

                        <td className="px-4 py-3">
                          <span
                            className={
                              item.tipe === "pemasukan"
                                ? "font-medium text-green-600"
                                : "font-medium text-red-600"
                            }
                          >
                            {item.tipe}
                          </span>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          {formatRupiah(item.jumlah)}
                        </td>

                        <td className="px-4 py-3 text-gray-600">
                          {item.deskripsi || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default DashboardPage;
