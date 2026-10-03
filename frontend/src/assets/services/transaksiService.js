export async function getAllTransaksi() {
    const response = await fetch("http://localhost:8080/api/transaksi")

    if (!response.ok) {
    throw new Error("Gagal mengambil transaksi");
    }
    
    const data = await response.json()

    return data
}