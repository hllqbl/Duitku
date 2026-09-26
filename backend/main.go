package main

import (
	"fmt"
	"net/http"
)

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Selamat datang di DuitKu")
}

func main() {
	db, err := connectDatabase()
	if err != nil {
		fmt.Println("Gagal terhubung ke database:", err)
		return
	}

	defer db.Close()

	getUsers(db)

	mux := http.NewServeMux()

	mux.HandleFunc("GET /{$}", homePage)

	fmt.Println("Server berjalan di port 8080!")

	err = http.ListenAndServe(":8080", mux)
	if err != nil {
		fmt.Println("Server error:", err)
	}
}
