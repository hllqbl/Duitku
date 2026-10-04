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