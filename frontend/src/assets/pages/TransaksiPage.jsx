import { useEffect, useState } from "react";
import { getAllTransaksi } from "../services/transaksiService";

function TransaksiPage() {
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

  if (loading) {
    return <p>Loading transaksi...</p>;
  }

  // 👇 setelah loading
  if (error) {
    return <p>Gagal mengambil transaksi: {error}</p>;
  }
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
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transaksi</h1>

        <p className="mt-1 text-sm text-gray-500">Daftar transaksi keuangan</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
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

                <td className="px-4 py-3 text-gray-600">{item.deskripsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TransaksiPage;
