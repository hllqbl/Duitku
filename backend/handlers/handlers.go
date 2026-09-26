package handlers

import (
	"database/sql"
	"net/http"
)

func UserHandler(w http.ResponseWriter, r *http.Request) {
	// CLUE 1:
	// Ini adalah HTTP handler.
	// Jadi parameter pertama harus bisa digunakan untuk mengirim
	// response kembali ke browser.
	type Handler struct {
		db *sql.DB
	} // CLUE 2:
	// Parameter kedua berisi informasi request dari client.
	// Misalnya method GET dan URL /api/users.

	// CLUE 3:
	// Handler ini nantinya perlu database.
	// Menurutmu, bagaimana cara UserHandler mendapatkan *sql.DB?
	// Ingat desain yang tadi kita bahas:
	//
	// Handler
	//   └── db (*sql.DB)

	// CLUE 4:
	// Jangan membuat koneksi database baru di setiap request.
	// Koneksi database sudah dibuat oleh main().
	// Handler cukup menerima/memegang koneksi tersebut.

	// CLUE 5:
	// Setelah mendapatkan db, nantinya kamu akan melakukan:
	//
	// db.Query(...)
	//
	// untuk mengambil users.

	// CLUE 6:
	// Untuk sekarang BELUM perlu menulis query SQL.
	// Fokus dulu membuat struktur handler yang bisa
	// "memiliki" database.
}
