package repository

import (
	"Duitku/models"
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

func (r *PenggunaRepository) CreatePengguna(pengguna models.Pengguna) error {
	query := `
		INSERT INTO users(username, password)
		VALUES ($1, $2)
	`

	_, err := r.db.Exec(
		query,
		pengguna.Pengguna,
		pengguna.KataSandi,
	)

	return err
}

func (r *PenggunaRepository) GetPenggunaByID(id int) (models.Pengguna, error) {
	query := `
		SELECT id, username, password
		FROM users
		WHERE id = $1
	`

	var pengguna models.Pengguna

	row := r.db.QueryRow(query, id)

	err := row.Scan(
		&pengguna.ID,
		&pengguna.Pengguna,
		&pengguna.KataSandi,
	)

	return pengguna, err
}

func (r *PenggunaRepository) SearchPengguna(username string) ([]models.Pengguna, error) {
	query := `
		SELECT id, username, password
		FROM users
		WHERE username ILIKE $1
	`

	rows, err := r.db.Query(query, "%"+username+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var daftarPengguna []models.Pengguna

	for rows.Next() {
		var pengguna models.Pengguna

		err := rows.Scan(
			&pengguna.ID,
			&pengguna.Pengguna,
			&pengguna.KataSandi,
		)

		if err != nil {
			return nil, err
		}

		daftarPengguna = append(daftarPengguna, pengguna)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return daftarPengguna, nil
}

func (r *PenggunaRepository) GetAllPengguna() ([]models.Pengguna, error) {
	query := `
		SELECT id, username, password
		FROM users
	`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var daftarPengguna []models.Pengguna

	for rows.Next() {
		var pengguna models.Pengguna

		err := rows.Scan(
			&pengguna.ID,
			&pengguna.Pengguna,
			&pengguna.KataSandi,
		)

		if err != nil {
			return nil, err
		}

		daftarPengguna = append(daftarPengguna, pengguna)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return daftarPengguna, nil
}

func (r *PenggunaRepository) UpdatePengguna(pengguna models.Pengguna) error {
	query := `
		UPDATE users
		SET
			username = $1,
			password = $2
		WHERE id = $3
	`

	_, err := r.db.Exec(
		query,
		pengguna.Pengguna,
		pengguna.KataSandi,
		pengguna.ID,
	)

	return err
}

func (r *PenggunaRepository) DeletePengguna(id int) error {
	query := `
		DELETE FROM users
		WHERE id = $1
	`

	_, err := r.db.Exec(query, id)

	return err
}

func (r *PenggunaRepository) GetByUsername(username string) (*models.Pengguna, error) {
	query := `
	SELECT 	id, username, password
	FROM users
	`
	var pengguna models.Pengguna

	err := r.db.QueryRow(query, username).Scan(
		&pengguna.ID,
		&pengguna.Pengguna,
		&pengguna.KataSandi,
	)

	if err != nil {
		return nil, err
	}

	return &pengguna, nil

}
