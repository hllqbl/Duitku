package handlers

import (
	"Duitku/models"
	"Duitku/service"
	"encoding/json"
	"net/http"
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
