package main

import (
	"Duitku/databases"
	"Duitku/handlers"
	"Duitku/repository"
	"Duitku/service"
	"log"
	"net/http"
)

func main() {
	// Koneksi ke database
	db, err := databases.KonekDatabase()

	if err != nil {
		log.Fatal("Gagal terhubung database", err)
	}
	defer db.Close()

	// BUAT REPOSITORY
	transaksiRepository := repository.NewTransaksiRepository(db)
	penggunaRepository := repository.NewPenggunaRepository(db)

	// BUAT SERVICE
	transaksiService := service.NewTransaksiService(transaksiRepository)
	penggunaService := service.NewPenggunaService(penggunaRepository)

	// BUAT HANDLER
	transaksiHandler := handlers.NewTransaksiHandler(transaksiService)
	penggunaHandler := handlers.NewPenggunaHandler(penggunaService)

	mux := http.NewServeMux()

	// ROUTES UNTUK ROUTE TRANSAKSI

	// POST /api/transaksi
	mux.HandleFunc("POST /api/transaksi", transaksiHandler.CreateTransaksi)

	// GET /api/transaksi
	mux.HandleFunc("GET /api/transaksi", transaksiHandler.GetAllTransaksi)

	// GET /api/transaksi/{id}
	mux.HandleFunc("GET /api/transaksi/{id}", transaksiHandler.GetTransaksiByID)

	// PUT /api/transaksi/{id}
	mux.HandleFunc("PUT /api/transaksi/{id}", transaksiHandler.UpdateTransaksi)

	// DELETE /api/transaksi/{id}
	mux.HandleFunc("DELETE /api/transaksi/{id}", transaksiHandler.DeleteTransaksi)

	// 9. Daftarkan route pengguna

	// POST   /api/pengguna
	mux.HandleFunc("POST /api/pengguna", penggunaHandler.CreatePengguna)

	// GET    /api/pengguna
	mux.HandleFunc("GET /api/pengguna", penggunaHandler.GetAllPengguna)

	// GET    /api/pengguna/{id}
	mux.HandleFunc("GET /api/pengguna/{id}", penggunaHandler.GetPenggunaByID)

	// GET    /api/pengguna/search
	mux.HandleFunc("GET /api/pengguna/search", penggunaHandler.SearchPengguna)

	// PUT    /api/pengguna/{id}
	mux.HandleFunc("PUT /api/pengguna/{id}", penggunaHandler.UpdatePengguna)

	// DELETE /api/pengguna/{id}
	mux.HandleFunc("DELETE /api/pengguna/{id}", penggunaHandler.DeletePengguna)

	// 10. Jalankan HTTP server
	log.Println("Server berjalan di http://localhost:8080")

	err = http.ListenAndServe(":8080", mux)

	if err != nil {
		log.Fatal("Server gagal dijalankan:", err)
	}
}
