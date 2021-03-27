import React from 'react'
import Floors from '../Floor/Floors';
import Player from "../Player/Player"

import Characters from "./Character.json"
import Rooms from "./Room.json"
import Omens from "./Omen.json"
import Items from "./Item.json"
import Events from "./Event.json"

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
        this.setupRoomContents(Rooms, Events, Omens, Items)
        this.state = {
            character: character, // The player on this computer
            players: players,
            currentPlayer: currentPlayer // The player whose turn it is
        }

        this.moveCurrentPlayer = this.moveCurrentPlayer.bind(this)
        this.changeValue = this.changeValue.bind(this)
    }

    // Change the index in one of the trait arrays
    // by the specified amount
    changeArrayValue(array, amount) {
        array[array.length - 1] += amount;
        if (array[array.length - 1] < 1) {
            array[array.length - 1] = 1
        }
        if (array[array.length - 1] > array.length) {
            array[array.length - 1] = array.length
        }
    }

    // valueType is one of the traits e.g. Speed
    changeValue(valueType, amount) {
        var player = this.state.currentPlayer
        this.changeArrayValue(player[valueType], amount);
        this.setState(state => ({
            currentPlayer: player
        }))
    }

    extractRandom(array) {
        var idx = parseInt(Math.random() * array.length);
        var result = array[idx]
        array.splice(idx, 1)
        return result;
    }

    setupRoomContents(rooms, events, omens, items) {
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].Contents.indexOf("E") >= 0) {
                rooms[i].Event = this.extractRandom(events)
            }
            if (rooms[i].Contents.indexOf("I") >= 0) {
                rooms[i].Items = [this.extractRandom(items)]
                if (rooms[i].Contents.indexOf("II") >= 0) {
                    rooms[i].Items.push(this.extractRandom(items))
                }
            }
            if (rooms[i].Contents.indexOf("O") >= 0) {
                rooms[i].Omen = this.extractRandom(omens)
            }
        }
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
        if (room.Event || room.Items || room.Omen) {
            player.movement = 0
            player.Cards = {
                Event: room.Event,
                Omen: room.Omen, 
                Items: room.Items
            }
            room.Event = ""
            room.Items = ""
            room.Omen = ""
        } else {
            player.movement -= 1
        }
        player.Room = room
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
                    changeValue={this.changeValue}
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