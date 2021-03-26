import React from 'react'
import Floors from '../Floor/Floors';
import Player from "../Player/Player"

import Characters from "./Character.json"
import Rooms from "./Room.json"
//import Omens from "./Omen.json"
//import Items from "./Item.json"

import "./game.css"

class Game extends React.Component {

    constructor(props) {
        super(props);
        
        // This will be replaced with get from server
        var character1 = Characters.find(item => item.Name === "Missy Dubourde")
        var character2 = Characters.find(item => item.Name === "Jenny LeClerc")
        var character3 = Characters.find(item => item.Name === "Madame Zostra")
        var character4 = Characters.find(item => item.Name === "Darrin “Flash” Williams")
        var character5 = Characters.find(item => item.Name === "Brandon Jaspers")
        var character6 = Characters.find(item => item.Name === "Father Rhinehardt")
        var players = [character1, character2, character3, character4, character5, character6]; 
        
        var currentPlayer = character4;
        var character = character4;
        var speed = currentPlayer.Speed;
        var movement = speed[speed[speed.length - 1] - 1]
        currentPlayer.movement = movement;

        this.putCharactersInStartRoom(players)
        this.state = {
            character: character, // The player on this computer
            players: players,
            currentPlayer: currentPlayer // The player whose turn it is
        }

        this.moveCurrentPlayer = this.moveCurrentPlayer.bind(this)
    }

    putCharactersInStartRoom(players) {
        var startRoom = Rooms.find(item => item.Name === "Entrance Hall")
        startRoom.floor = "Ground"
        for (var i = 0; i < players.length; i++) {
            players[i].Room = startRoom
        }
    }

    moveCurrentPlayer(room) {
        var player = this.state.currentPlayer
        player.Room = room
        player.movement -= 1
        this.setState(state => ({
            currentPlayer: player
        }))
    }

    render() {
        return (
            <div className="game">
                <Player 
                    players={this.state.players} 
                    character={this.state.character} 
                    currentPlayer={this.state.currentPlayer}
                />
                <Floors 
                    players={this.state.players}
                    character={this.state.character} 
                    currentPlayer={this.state.currentPlayer} 
                    rooms={Rooms} 
                    moveCurrentPlayer={this.moveCurrentPlayer}
                />
            </div>
        )
    }
}

export default Game