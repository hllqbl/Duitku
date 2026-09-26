package repository

import (
	"database/sql"
)

type PenggunaRepository struct {
	db *sql.DB
}

func NewPenggunaRepository(db *sql.DB) *PenggunaRepository {
	return &PenggunaRepository{
		db: db,
	}
}
