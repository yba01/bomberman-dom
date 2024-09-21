package handlers

import (
	"bombermandom/pkg/models"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/websocket"
)

var gameStarted = false
var InitMap = GenerateMap(13, 19)

var countDown int

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var players = make(map[string]*websocket.Conn)

func WebSocketHandle(w http.ResponseWriter, r *http.Request) {

	if gameStarted {
		http.Error(w, "Game has already started. No new players can join.", http.StatusForbidden)
		return
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	var player models.Player
	err = conn.ReadJSON(&player)

	if err != nil {
		log.Println("Error reading player:", err)
		return
	}
	players[player.Username] = conn

	// broadcastPlayerCount()

	go HandleConn(conn, player.Username)
}

func HandleConn(conn *websocket.Conn, playerName string) {
	DrawMap(playerName, InitMap, players)
	var mess models.Message
	mess.PlayerCount = len(players)
	mess.MessageType = "playerCount"
	mess.Player.Username = playerName
	mess.Player.InGameName = "player" + strconv.Itoa(len(players))
	broadcast(mess)
	for {
		var userMess models.Message
		err := conn.ReadJSON(&userMess)
		if err != nil {
			removePlayer(playerName)
			log.Println(err)
			return
		}
		if userMess.MessageType == "chat" {
			userMess.Player.Username = playerName
			broadcast(userMess)
		}
		if userMess.MessageType == "gameStarted" {
			InitMap = GenerateMap(13, 19)
			gameStarted = true
		}
		if userMess.MessageType == "playerMovement" {
			userMess.Player.InGameName = mess.Player.InGameName
			broadcast(userMess)
		}
		if userMess.MessageType == "playerPlaceBomb" || userMess.MessageType == "powerUp" {
			broadcast(userMess)
		}
		if userMess.MessageType == "lost" {
			removePlayer(userMess.Player.Username)
			userMess.PlayerCount = len(players)
			broadcast(userMess)
			break
		}
		if userMess.MessageType == "countdownUpdate" {
			countDown = userMess.Countdown
		}

		if userMess.MessageType == "getCountDown" {
			userMess.Countdown = countDown
			conn.WriteJSON(userMess)
		}
	}
}
