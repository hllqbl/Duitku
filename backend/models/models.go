package models

type Transaksi struct {
	ID         int    `json:"id_transaksi"`
	PenggunaID int    `json:"pengguna_id"`
	Tipe       string `json:"tipe"`
	Jumlah     int    `json:"jumlah"`
	Kategori   string `json:"kategori"`
	Deskripsi  string `json:"deskripsi"`
	Tanggal    string `json:"tanggal"`
}

type Pengguna struct {
	ID        int    `json:"id_pengguna"`
	Pengguna  string `json:"pengguna"`
	KataSandi string `json:"katasandi"`
}
