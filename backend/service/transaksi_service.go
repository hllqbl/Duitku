package service

import (
	"Duitku/models"
	"Duitku/repository"
	"database/sql"
	"errors"
	"strings"
)

/*
1. CreateTransaksi()
2. GetTransaksiByID()
3. GetTransaksiByPenggunaID()
4. GetAllTransaksi()
5. UpdateTransaksi()
6. DeleteTransaksi()
*/

type TransaksiService struct {
	repo *repository.TransaksiRepository
}

func NewTransaksiService(repo *repository.TransaksiRepository) *TransaksiService {
	return &TransaksiService{
		repo: repo,
	}
}

func (s *TransaksiService) CreateTransaksi(transaksi models.Transaksi) error {
	if transaksi.PenggunaID <= 0 {
		return errors.New("ID Pengguna harus bernilai lebih dari 0")
	}

	if transaksi.Tipe != "pemasukan" && transaksi.Tipe != "pengeluaran" {
		return errors.New(`Tipe harus bernilai "pemasukan" atau "pengeluaran"`)
	}

	if transaksi.Jumlah <= 0 {
		return errors.New("Jumlah harus bernilai lebih dari 0")
	}

	if strings.TrimSpace(transaksi.Kategori) == "" {
		return errors.New("Kategori wajib diisi")
	}

	if transaksi.Deskripsi != "" && strings.TrimSpace(transaksi.Deskripsi) == "" {
		return errors.New("Deskripsi tidak boleh hanya berisi spasi")
	}

	return s.repo.CreateTransaksi(transaksi)
}

func (s *TransaksiService) GetTransaksiByID(id int) (models.Transaksi, error) {

	// 1. Validasi ID
	if id <= 0 {
		return models.Transaksi{}, errors.New("id tidak boleh kurang dari 1")
	}

	// 2. Panggil repository
	transaksi, err := s.repo.GetTransaksiByID(id)

	// 3. Kalau tidak ditemukan
	if errors.Is(err, sql.ErrNoRows) {
		return models.Transaksi{}, err
	}

	// 4. Kalau ada error database lainnya
	if err != nil {
		return models.Transaksi{}, err
	}

	// 5. Berhasil
	return transaksi, nil
}

func (s *TransaksiService) GetTransaksiByPenggunaID(penggunaID int) ([]models.Transaksi, error) {
	if penggunaID <= 0 {
		return []models.Transaksi{}, errors.New("mohon masukkan pengguna id yang sesuai!")
	}

	transaksi, err := s.repo.GetTransaksiByPenggunaID(penggunaID)

	if err != nil {
		return []models.Transaksi{}, err
	}

	return transaksi, nil
}

func (s *TransaksiService) GetAllTransaksi() ([]models.Transaksi, error) {
	transaksi, err := s.repo.GetAllTransaksi()

	if err != nil {
		return nil, err
	}

	return transaksi,nil
}

func (s *TransaksiService) UpdateTransaksi(transaksi models.Transaksi) error {
	if transaksi.ID <= 0 {
		return errors.New("ID transaksi harus lebih dari 0")
	}

	if transaksi.PenggunaID <= 0 {
		return errors.New("ID pengguna harus lebih dari 0")
	}

	if transaksi.Tipe != "pemasukan" && transaksi.Tipe != "pengeluaran" {
		return errors.New(`tipe harus bernilai "pemasukan" atau "pengeluaran"`)
	}

	if transaksi.Jumlah <= 0 {
		return errors.New("jumlah harus lebih dari 0")
	}

	if strings.TrimSpace(transaksi.Kategori) == "" {
		return errors.New("kategori wajib diisi")
	}

	if transaksi.Deskripsi != "" && strings.TrimSpace(transaksi.Deskripsi) == "" {
		return errors.New("deskripsi tidak boleh hanya berisi spasi")
	}

	err := s.repo.UpdateTransaksi(transaksi)
	if err != nil {
		return err
	}

	return nil
}

func (s *TransaksiService) DeleteTransaksi(id int) error {
	if id <= 0 {
		return errors.New("...")
	}

	err := s.repo.DeleteTransaksi(id)

	if err != nil {
		return err
	}

	return nil
}