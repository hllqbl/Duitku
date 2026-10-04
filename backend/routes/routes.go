package routes

import (
	"Duitku/handlers"
	"net/http"
)

func SetupRoutes(
	mux *http.ServeMux,
	transaksiHandler *handlers.TransaksiHandler,
	penggunaHandler *handlers.PenggunaHandler,
) {

	// =========================
	// ROUTE TRANSAKSI
	// =========================

	// POST /api/transaksi
	mux.HandleFunc(
		"POST /api/transaksi",
		transaksiHandler.CreateTransaksi,
	)

	// GET /api/transaksi
	mux.HandleFunc(
		"GET /api/transaksi",
		transaksiHandler.GetAllTransaksi,
	)

	// GET /api/transaksi/{id}
	mux.HandleFunc(
		"GET /api/transaksi/{id}",
		transaksiHandler.GetTransaksiByID,
	)

	// PUT /api/transaksi/{id}
	mux.HandleFunc(
		"PUT /api/transaksi/{id}",
		transaksiHandler.UpdateTransaksi,
	)

	// DELETE /api/transaksi/{id}
	mux.HandleFunc(
		"DELETE /api/transaksi/{id}",
		transaksiHandler.DeleteTransaksi,
	)

	// =========================
	// ROUTE PENGGUNA
	// =========================

	// POST /api/pengguna
	mux.HandleFunc(
		"POST /api/pengguna",
		penggunaHandler.CreatePengguna,
	)

	// GET /api/pengguna
	mux.HandleFunc(
		"GET /api/pengguna",
		penggunaHandler.GetAllPengguna,
	)

	// GET /api/pengguna/{id}
	mux.HandleFunc(
		"GET /api/pengguna/{id}",
		penggunaHandler.GetPenggunaByID,
	)

	// GET /api/pengguna/search
	mux.HandleFunc(
		"GET /api/pengguna/search",
		penggunaHandler.SearchPengguna,
	)

	// PUT /api/pengguna/{id}
	mux.HandleFunc(
		"PUT /api/pengguna/{id}",
		penggunaHandler.UpdatePengguna,
	)

	// DELETE /api/pengguna/{id}
	mux.HandleFunc(
		"DELETE /api/pengguna/{id}",
		penggunaHandler.DeletePengguna,
	)
}
