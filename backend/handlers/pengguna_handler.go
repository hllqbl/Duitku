package handlers

import (
	"Duitku/models"
	"Duitku/service"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

type PenggunaHandler struct {
	service *service.PenggunaService
}

func NewPenggunaHandler(service *service.PenggunaService) *PenggunaHandler {
	return &PenggunaHandler{
		service: service,
	}
}

// POST /api/pengguna
func (h *PenggunaHandler) CreatePengguna(w http.ResponseWriter, r *http.Request) {
	var pengguna models.Pengguna

	err := json.NewDecoder(r.Body).Decode(&pengguna)
	if err != nil {
		http.Error(w, "400 Bad Request", http.StatusBadRequest)
		return
	}

	err = h.service.CreatePengguna(pengguna)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "pengguna berhasil dibuat",
	})
}

// GET /api/pengguna/{id}
func (h *PenggunaHandler) GetPenggunaByID(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	parts := strings.Split(path, "/")

	if len(parts) < 4 {
		http.Error(w, "ID pengguna tidak ditemukan", http.StatusBadRequest)
		return
	}

	idString := parts[3]

	id, err := strconv.Atoi(idString)
	if err != nil {
		http.Error(w, "ID harus berupa angka", http.StatusBadRequest)
		return
	}

	pengguna, err := h.service.GetPenggunaByID(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pengguna)
}

// GET /api/pengguna/search?username=hilal
func (h *PenggunaHandler) SearchPengguna(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")

	pengguna, err := h.service.SearchPengguna(username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pengguna)
}

// GET /api/pengguna
func (h *PenggunaHandler) GetAllPengguna(w http.ResponseWriter, r *http.Request) {
	pengguna, err := h.service.GetAllPengguna()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(pengguna)
}

// PUT /api/pengguna/{id}
func (h *PenggunaHandler) UpdatePengguna(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	parts := strings.Split(path, "/")

	if len(parts) < 4 {
		http.Error(w, "ID pengguna tidak ditemukan", http.StatusBadRequest)
		return
	}

	idString := parts[3]

	id, err := strconv.Atoi(idString)
	if err != nil {
		http.Error(w, "ID harus berupa angka", http.StatusBadRequest)
		return
	}

	var pengguna models.Pengguna

	err = json.NewDecoder(r.Body).Decode(&pengguna)
	if err != nil {
		http.Error(w, "gagal melakukan decode JSON", http.StatusBadRequest)
		return
	}

	pengguna.ID = id

	err = h.service.UpdatePengguna(pengguna)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "pengguna berhasil diperbarui",
	})
}

// DELETE /api/pengguna/{id}
func (h *PenggunaHandler) DeletePengguna(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	parts := strings.Split(path, "/")

	if len(parts) < 4 {
		http.Error(w, "ID pengguna tidak ditemukan", http.StatusBadRequest)
		return
	}

	idString := parts[3]

	id, err := strconv.Atoi(idString)
	if err != nil {
		http.Error(w, "ID harus berupa angka", http.StatusBadRequest)
		return
	}

	err = h.service.DeletePengguna(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "pengguna berhasil dihapus",
	})
}
