package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Player struct {
	Username string `json:"username"`
}

type Message struct {
	MessageType string
	TheMessage string
	PlayerCount int
	PlayerName string
	DataMap [][]int
}

var gameStarted = false

var InitMap = GenerateMap(13,19)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var players = make(map[string]*websocket.Conn)

func WebSocketHandle(w http.ResponseWriter, r *http.Request) {

	// if gameStarted {
	// 	http.Error(w, "Game has already started. No new players can join.", http.StatusForbidden)
	// 	return
	// }

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	var player Player
	err = conn.ReadJSON(&player)

	if err != nil {
		log.Println("Error reading player:", err)
		return
	}
	players[player.Username] = conn

	fmt.Println(players)
	fmt.Println(len(players))
	// broadcastPlayerCount()

	go HandleConn(conn, player.Username)
}

func HandleConn(conn *websocket.Conn, playerName string) {
	DrawMap(playerName,InitMap,players)
	var mess Message
	mess.PlayerCount = len(players)
	mess.MessageType = "playerCount"
	mess.PlayerName = playerName
	broadcast(mess)
	for {
		var userMess Message
		err := conn.ReadJSON(&userMess)
		if err != nil {
			removePlayer(playerName)
			log.Println(err)
			return
		}
		if userMess.MessageType == "chat" {
			userMess.PlayerName = playerName
			broadcast(userMess)
		}
		if userMess.MessageType == "startGame" {
			fmt.Println("game Started")
			gameStarted = true
		}
	}
}
