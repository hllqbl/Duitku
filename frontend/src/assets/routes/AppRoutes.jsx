import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import TransaksiPage from "../pages/TransaksiPage";
import TambahTransaksiPage from "../pages/TambahTransaksiPage";
import EditTransaksiPage from "../pages/EditTransaksiPage";
import PenggunaPage from "../pages/PenggunaPage";

function AppRoutes() {
  return (
    <Routes>
      {/* route dashboard */}
    <Route path="/dashboard" element={<DashboardPage />} />
      {/* route transaksi */}
    <Route path="/transaksi" element={<TransaksiPage />} />
      {/* route tambah transaksi */}
    <Route path="/transaksi/tambah" element={<TambahTransaksiPage />} />
      {/* route edit transaksi */}
    <Route path="/transaksi/edit/:id" element={<EditTransaksiPage />} />
      {/* route pengguna */}
       <Route path="/pengguna" element={<PenggunaPage />} />
    </Routes>
  );
}

export default AppRoutes;