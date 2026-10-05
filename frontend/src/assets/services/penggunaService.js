const API_URL = "http://localhost:8080/api";

// =========================
// LOGIN PENGGUNA
// =========================

export async function loginPengguna(data) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login gagal");
  }

  return result;
}

// =========================
// REGISTER PENGGUNA
// =========================

export async function registerPengguna(data) {
  const response = await fetch(`${API_URL}/pengguna`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registrasi gagal");
  }

  return result;
}

// =========================
// GET PENGGUNA BY ID
// =========================

export async function getPenggunaById(id) {
  const response = await fetch(`${API_URL}/pengguna/${id}`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal mengambil data pengguna");
  }

  return result;
}

// =========================
// UPDATE PENGGUNA
// =========================

export async function updatePengguna(id, data) {
  const response = await fetch(`${API_URL}/pengguna/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Gagal memperbarui data pengguna");
  }

  return result;
}
