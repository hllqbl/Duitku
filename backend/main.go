package main

import (
	"Duitku/databases"
	"Duitku/handlers"
	"Duitku/repository"
	"Duitku/routes"
	"Duitku/service"
	"log"
	"net/http"
)

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set(
			"Access-Control-Allow-Origin",
			"http://localhost:5173",
		)

		w.Header().Set(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS",
		)

		w.Header().Set(
			"Access-Control-Allow-Headers",
			"Content-Type",
		)

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {

	// =========================
	// DATABASE
	// =========================

	db, err := databases.KonekDatabase()

	if err != nil {
		log.Fatal("Gagal terhubung database:", err)
	}

	defer db.Close()

	// =========================
	// REPOSITORY
	// =========================

	transaksiRepository := repository.NewTransaksiRepository(db)

	penggunaRepository := repository.NewPenggunaRepository(db)

	// =========================
	// SERVICE
	// =========================

	transaksiService := service.NewTransaksiService(
		transaksiRepository,
	)

	penggunaService := service.NewPenggunaService(
		penggunaRepository,
	)

	// =========================
	// HANDLER
	// =========================

	transaksiHandler := handlers.NewTransaksiHandler(
		transaksiService,
	)

	penggunaHandler := handlers.NewPenggunaHandler(
		penggunaService,
	)

	// =========================
	// ROUTER
	// =========================

	mux := http.NewServeMux()

	routes.SetupRoutes(
		mux,
		transaksiHandler,
		penggunaHandler,
	)

	// =========================
	// SERVER
	// =========================

	log.Println("Server berjalan di http://localhost:8080")

	err = http.ListenAndServe(
		":8080",
		enableCORS(mux),
	)

	if err != nil {
		log.Fatal("Server gagal dijalankan:", err)
	}
}
