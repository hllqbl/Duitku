import { Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/DashboardPage";
import TransaksiPage from "../pages/TransaksiPage";
import TambahTransaksiPage from "../pages/TambahTransaksiPage";
import EditTransaksiPage from "../pages/EditTransaksiPage";
import PenggunaPage from "../pages/PenggunaPage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Halaman awal */}
      <Route path="/" element={<LoginPage />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Register */}
      <Route path="/register" element={<RegisterPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* Transaksi */}
      <Route path="/transaksi" element={<TransaksiPage />} />

      {/* Tambah transaksi */}
      <Route path="/transaksi/tambah" element={<TambahTransaksiPage />} />

      {/* Edit transaksi */}
      <Route path="/transaksi/edit/:id" element={<EditTransaksiPage />} />

      {/* Pengguna */}
      <Route path="/pengguna" element={<PenggunaPage />} />
    </Routes>
  );
}

export default AppRoutes;
