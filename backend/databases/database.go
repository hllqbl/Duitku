package databases

import (
	"database/sql"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/joho/godotenv"
)

func KonekDatabase() (*sql.DB, error) {

	// Membaca file .env
	err := godotenv.Load()
	if err != nil {
		return nil, err
	}

	// Mengambil DATABASE_URL dari environment
	dsn := os.Getenv("DATABASE_URL")

	// Membuka koneksi database
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}

	// Mengecek apakah database benar-benar bisa dihubungi
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}
