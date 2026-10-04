export async function getAllTransaksi() {
  const response = await fetch("http://localhost:8080/api/transaksi");

  if (!response.ok) {
    throw new Error("Gagal mengambil transaksi");
  }

  const data = await response.json();

  return data;
}

export async function createTransaksi(data) {
  const response = await fetch("http://localhost:8080/api/transaksi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gagal membuat transaksi");
  }

  const result = await response.json();

  return result;
}

export async function getTransaksiById(id) {
  const response = await fetch(`http://localhost:8080/api/transaksi/${id}`);

  if (!response.ok) {
    throw new Error("Gagal mengambil transaksi dengan id");
  }

  const data = await response.json();

  return data;
}

/* 
	// PUT /api/transaksi/{id}
	mux.HandleFunc("PUT /api/transaksi/{id}", transaksiHandler.UpdateTransaksi)

	// DELETE /api/transaksi/{id}
	mux.HandleFunc("DELETE /api/transaksi/{id}", transaksiHandler.DeleteTransaksi)
*/

export async function updateTransaksi(id, data) {
  const response = await fetch(`http://localhost:8080/api/transaksi/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Gagal melakukan update transaksi");
  }

  const result = await response.json();

  return result;
}

export async function deleteTransaksi(id) {
  const response = await fetch(`http://localhost:8080/api/transaksi/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Gagal melakukan DELETE transaksi");
  }

  const result = await response.json();

  return result;
}
