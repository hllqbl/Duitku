package service

import (
	"Duitku/models"
	"Duitku/repository"
	"database/sql"
	"errors"
	"strings"
)

type PenggunaService struct {
	repo *repository.PenggunaRepository
}

func NewPenggunaService(repo *repository.PenggunaRepository) *PenggunaService {
	return &PenggunaService{
		repo: repo,
	}
}

func (s *PenggunaService) CreatePengguna(pengguna models.Pengguna) error {
	if strings.TrimSpace(pengguna.Pengguna) == "" {
		return errors.New("username wajib diisi")
	}

	if strings.TrimSpace(pengguna.KataSandi) == "" {
		return errors.New("password wajib diisi")
	}

	err := s.repo.CreatePengguna(pengguna)
	if err != nil {
		return err
	}

	return nil
}

func (s *PenggunaService) GetPenggunaByID(id int) (models.Pengguna, error) {
	if id <= 0 {
		return models.Pengguna{}, errors.New("ID pengguna harus lebih dari 0")
	}

	pengguna, err := s.repo.GetPenggunaByID(id)

	if errors.Is(err, sql.ErrNoRows) {
		return models.Pengguna{}, errors.New("pengguna tidak ditemukan")
	}

	if err != nil {
		return models.Pengguna{}, err
	}

	return pengguna, nil
}

func (s *PenggunaService) SearchPengguna(username string) ([]models.Pengguna, error) {
	if strings.TrimSpace(username) == "" {
		return []models.Pengguna{}, errors.New("username pencarian wajib diisi")
	}

	pengguna, err := s.repo.SearchPengguna(username)

	if err != nil {
		return nil, err
	}

	return pengguna, nil
}

func (s *PenggunaService) GetAllPengguna() ([]models.Pengguna, error) {
	pengguna, err := s.repo.GetAllPengguna()

	if err != nil {
		return nil, err
	}

	return pengguna, nil
}

func (s *PenggunaService) UpdatePengguna(pengguna models.Pengguna) error {
	if pengguna.ID <= 0 {
		return errors.New("ID pengguna harus lebih dari 0")
	}

	if strings.TrimSpace(pengguna.Pengguna) == "" {
		return errors.New("username wajib diisi")
	}

	if strings.TrimSpace(pengguna.KataSandi) == "" {
		return errors.New("password wajib diisi")
	}

	err := s.repo.UpdatePengguna(pengguna)

	if err != nil {
		return err
	}

	return nil
}

func (s *PenggunaService) DeletePengguna(id int) error {
	if id <= 0 {
		return errors.New("ID pengguna harus lebih dari 0")
	}

	err := s.repo.DeletePengguna(id)

	if err != nil {
		return err
	}

	return nil
}

func (s *PenggunaService) Login(username, password string) (models.Pengguna, error) {

	pengguna, err := s.repo.GetByUsername(username)

	if err != nil {
		return models.Pengguna{}, err
	}

	if pengguna.KataSandi != password {
		return models.Pengguna{}, errors.New("password salah")
	}

	return *pengguna, nil
}
