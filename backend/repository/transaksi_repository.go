package repository

/*
CreateTransaksi()
GetTransaksiByID()
GetTransaksiByPenggunaID()
GetAllTransaksi()
UpdateTransaksi()
DeleteTransaksi()
*/

/*
SELECT → QueryRow → Scan
INSERT → Exec
UPDATE → Exec
DELETE → Exec
SELECT banyak → Query → Next → Scan
*/

import (
	"Duitku/models"
	"database/sql"
)

type TransaksiRepository struct {
	db *sql.DB
}

func NewTransaksiRepository(db *sql.DB) *TransaksiRepository {
	return &TransaksiRepository{
		db: db,
	}
}

func (r *TransaksiRepository) CreateTransaksi(transaksi models.Transaksi) error {
	//query
	query := `
		INSERT INTO transaksi(user_id, type, amount, category, description, date)
		VALUES($1, $2, $3, $4, $5, $6)
	`

	_, err := r.db.Exec(
		query,
		transaksi.PenggunaID,
		transaksi.Tipe,
		transaksi.Jumlah,
		transaksi.Kategori,
		transaksi.Deskripsi,
		transaksi.Tanggal,
	)
	return err
}

func (r *TransaksiRepository) GetTransaksiByID(id int) (models.Transaksi, error) {
	query := `
	SELECT id, user_id, type, amount, category, description, date
	FROM transaksi
	WHERE id = $1
	`
	var transaksi models.Transaksi

	row := r.db.QueryRow(query, id)
	err := row.Scan(
		&transaksi.PenggunaID,
		&transaksi.Tipe,
		&transaksi.Jumlah,
		&transaksi.Kategori,
		&transaksi.Deskripsi,
		&transaksi.Tanggal,
	)
	return transaksi, err
}

func (r *TransaksiRepository) GetAllTransaksi() ([]models.Transaksi, error) {
	query := `
		SELECT id, user_id, type, amount, category, description, date
		FROM transaksi
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var daftarTransaksi []models.Transaksi

	for rows.Next() {
		var transaksi models.Transaksi

		err = rows.Scan(
			&transaksi.ID,
			&transaksi.PenggunaID,
			&transaksi.Tipe,
			&transaksi.Jumlah,
			&transaksi.Kategori,
			&transaksi.Deskripsi,
			&transaksi.Tanggal,
		)

		if err != nil {
			return nil, err
		}

		daftarTransaksi = append(daftarTransaksi, transaksi)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return daftarTransaksi, nil
}
