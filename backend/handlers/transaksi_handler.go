package handlers

import (
	"Duitku/models"
	"Duitku/service"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

type TransaksiHandler struct {
	service *service.TransaksiService
}

func NewTransaksiHandler(service *service.TransaksiService) *TransaksiHandler {
	return &TransaksiHandler{
		service: service,
	}
}

func (h *TransaksiHandler) CreateTransaksi(w http.ResponseWriter, r *http.Request) {
	var transaksi models.Transaksi

	err := json.NewDecoder(r.Body).Decode(&transaksi)
	if err != nil {
		http.Error(w, "400 Bad Request", http.StatusBadRequest)
		return
	}

	err = h.service.CreateTransaksi(transaksi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Jika berhasil
	w.WriteHeader(http.StatusCreated)

	json.NewEncoder(w).Encode(map[string]string{
		"message": "transaksi berhasil dibuat",
	})

}

func (h *TransaksiHandler) GetAllTransaksi(w http.ResponseWriter, r *http.Request) {
	transaksi, err := h.service.GetAllTransaksi()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(transaksi)
}

func (h *TransaksiHandler) GetTransaksiByID(w http.ResponseWriter, r *http.Request) {
	path := r.URL.Path

	parts := strings.Split(path, "/")

	if len(parts) < 4 {
		http.Error(w, "ID transaksi tidak ditemukan", http.StatusBadRequest)
		return
	}

	idString := parts[3]

	id, err := strconv.Atoi(idString)

	if err != nil {
		http.Error(w, "ID harus berupa angka", http.StatusBadRequest)
		return
	}

	transaksi, err := h.service.GetTransaksiByID(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(transaksi)
}

func (h *TransaksiHandler) UpdateTransaksi(w http.ResponseWriter, r *http.Request) {

	// Ambil path dari URL
	path := r.URL.Path

	// Pecah path menggunakan strings.Split()
	parts := strings.Split(path, "/")

	// Pastikan ID tersedia sebelum mengambil parts[3]
	if len(parts) < 4 {
		http.Error(w, "id tidak ditemukan", http.StatusBadRequest)
		return
	}

	// Ambil ID dalam bentuk string dari parts[3]
	idString := parts[3]

	// Ubah ID dari string menjadi int
	id, err := strconv.Atoi(idString)

	// Jika Atoi error
	if err != nil {
		http.Error(w, "Error mengonversi ID", http.StatusBadRequest)
		return
	}

	// Buat variable transaksi
	var transaksi models.Transaksi

	// Ambil JSON dari request body
	err = json.NewDecoder(r.Body).Decode(&transaksi)

	// Jika Decode error
	if err != nil {
		http.Error(w, "gagal melakukan decode json", http.StatusBadRequest)
		return
	}

	// Masukkan ID dari URL ke transaksi
	transaksi.ID = id

	// Panggil service
	err = h.service.UpdateTransaksi(transaksi)

	// Jika service error
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Set Content-Type
	w.Header().Set("Content-Type", "application/json")

	// Kirim status OK
	w.WriteHeader(http.StatusOK)

	// Kirim response JSON
	json.NewEncoder(w).Encode(map[string]string{
		"message": "transaksi berhasil diperbarui",
	})
}

func (h *TransaksiHandler) DeleteTransaksi(w http.ResponseWriter, r *http.Request) {
	// Ambil path dari URL
	path := r.URL.Path

	// Pecah path menggunakan strings.Split()
	parts := strings.Split(path, "/")

	// Pastikan ID tersedia sebelum mengambil parts[3]
	if len(parts) < 4 {
		http.Error(w, "id tidak ditemukan dalam path", http.StatusBadRequest)
		return
	}

	// Ambil ID dalam bentuk string dari parts[3]
	idString := parts[3]

	// Ubah ID dari string menjadi int
	id, err := strconv.Atoi(idString)

	// Jika Atoi error
	if err != nil {
		http.Error(w, "gagal mengonversi id string", http.StatusBadRequest)
		return
	}

	// Panggil service DeleteTransaksi() dengan ID
	err = h.service.DeleteTransaksi(id)

	// Jika service error
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Set Content-Type menjadi application/json
	w.Header().Set("Content-Type", "application/json")

	// Kirim status OK
	w.WriteHeader(http.StatusOK)

	// Kirim response JSON
	json.NewEncoder(w).Encode(map[string]string{
		"message": "berhasil dihapus",
	})
}
