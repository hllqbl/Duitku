package repository

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
	query := `
		INSERT INTO transactions(
			user_id,
			type,
			amount,
			category,
			description,
			date
		)
		VALUES ($1, $2, $3, $4, $5, $6)
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
		SELECT
			id,
			user_id,
			type,
			amount,
			category,
			description,
			date
		FROM transactions
		WHERE id = $1
	`

	var transaksi models.Transaksi

	row := r.db.QueryRow(query, id)

	err := row.Scan(
		&transaksi.ID,
		&transaksi.PenggunaID,
		&transaksi.Tipe,
		&transaksi.Jumlah,
		&transaksi.Kategori,
		&transaksi.Deskripsi,
		&transaksi.Tanggal,
	)

	return transaksi, err
}

func (r *TransaksiRepository) GetTransaksiByPenggunaID(penggunaID int) ([]models.Transaksi, error) {
	query := `
		SELECT
			id,
			user_id,
			type,
			amount,
			category,
			description,
			date
		FROM transactions
		WHERE user_id = $1
	`

	rows, err := r.db.Query(query, penggunaID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var daftarTransaksi []models.Transaksi

	for rows.Next() {
		var transaksi models.Transaksi

		err := rows.Scan(
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

func (r *TransaksiRepository) GetAllTransaksi() ([]models.Transaksi, error) {
	query := `
		SELECT
			id,
			user_id,
			type,
			amount,
			category,
			description,
			date
		FROM transactions
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var daftarTransaksi []models.Transaksi

	for rows.Next() {
		var transaksi models.Transaksi

		err := rows.Scan(
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

func (r *TransaksiRepository) UpdateTransaksi(transaksi models.Transaksi) error {
	query := `
		UPDATE transactions
		SET
			user_id = $1,
			type = $2,
			amount = $3,
			category = $4,
			description = $5,
			date = $6
		WHERE id = $7
	`

	_, err := r.db.Exec(
		query,
		transaksi.PenggunaID,
		transaksi.Tipe,
		transaksi.Jumlah,
		transaksi.Kategori,
		transaksi.Deskripsi,
		transaksi.Tanggal,
		transaksi.ID,
	)

	return err
}

func (r *TransaksiRepository) DeleteTransaksi(id int) error {
	query := `
		DELETE FROM transactions
		WHERE id = $1
	`

	_, err := r.db.Exec(query, id)

	return err
}
