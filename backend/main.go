package main

import (
	"bombermandom/handlers"
	"fmt"
	"net/http"
)

func main() {

	http.HandleFunc("/ws", handlers.WebSocketHandle)

	fmt.Println("listening...")
	http.ListenAndServe(":8081", nil)
}
