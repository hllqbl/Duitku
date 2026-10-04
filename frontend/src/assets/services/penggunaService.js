const API_URL = "http://localhost:8080/api/pengguna";

// =========================
// GET PENGGUNA BY ID
// =========================

export async function getPenggunaById(id) {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil data pengguna");
  }

  return await response.json();
}

// =========================
// UPDATE PENGGUNA
// =========================

export async function updatePengguna(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gagal memperbarui data pengguna");
  }

  return await response.json();
}
