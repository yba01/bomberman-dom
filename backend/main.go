package main

import (
	"bombermandom/handlers"
	"net/http"
)

func main() {
	
	http.HandleFunc("/ws", handlers.WebSocketHandle)

	http.ListenAndServe(":8081", nil)

}