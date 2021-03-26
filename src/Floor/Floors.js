import React from 'react'
import Floor from "./Floor"
import "./Floor.css"

class Floors extends React.Component {

    constructor(props) {
        super(props);
        var groundRooms = this.getStartRooms("Ground")
        for (var i = 0; i < groundRooms.length; i++) {
            groundRooms[i].floor = "Ground"
        }
        var upperRooms = this.getStartRooms("Upper")
        for (i = 0; i < upperRooms.length; i++) {
            upperRooms[i].floor = "Upper"
        }
        this.state = {
            activeFloor: props.currentPlayer.Room.floor,
            roomStack: this.getRoomStack(this.props.rooms),
            groundRooms: groundRooms,
            groundPossibleRooms: this.getPossibleRooms(groundRooms),
            groundPlayers: this.getPlayersInFloor(props.players, "Ground"),
            upperRooms: upperRooms,
            upperPossibleRooms: this.getPossibleRooms(upperRooms),
            upperPlayers: [],
            basementRooms: [],
            basementPossibleRooms: [],
            basementPlayers: []
        }
        this.selectPossibleRoom = this.selectPossibleRoom.bind(this)
        this.moveCurrentPlayer = this.moveCurrentPlayer.bind(this)
        this.selectRoom = this.selectRoom.bind(this)
    }

    
    getPlayersInFloor(players, floor) {
        var result = []
        for (var i = 0; i < players.length; i++) {
            if (players[i].Room.floor === floor) {
                result.push(players[i])
            }
        }
        return result;
    }
    

    // Grab a room from the set with a matching floor
    // I.e. the room is returned and taken out of the 
    // Array of rooms
    
    extractRandomRoom(rooms, floor) {
        var result = null;
        var floorLetter = floor.substr(0, 1)
        var roomAvaiable = false;
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].Locations.indexOf(floorLetter) >= 0) {
                roomAvaiable = true;
                break;
            }
        }
        if (roomAvaiable) {
            while (result === null) {
                var roomNum = parseInt(Math.random() * rooms.length);
                var room = rooms[roomNum];
                if (room.Locations.indexOf(floorLetter) >= 0) {
                    result = room;
                }
            }
            result.floor = floor
            rooms.splice(roomNum, 1)
        }
        return result;
    }
    

    // The stack has rooms other than the start rooms
    getRoomStack(rooms) {
        var result = [];
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i]
            if (
                room.Name !== "Entrance Hall"
                && room.Name !== "Foyer"
                && room.Name !== "Grand Staircase"
                && room.Name !== "Upper Landing"
            ) {
                result.push(room);
            }
        }
        return result;
    }

    // Return true if there is a room or a possible room
    // already at the given position
    roomOrPossibleExists(position, rooms, possibles) {
        var result = false;
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].position[0] === position[0] && rooms[i].position[1] === position[1]) {
                result = true;
                break;
            }
        }
        for (i = 0; i < possibles.length; i++) {
            if (possibles[i].position[0] === position[0] && possibles[i].position[1] === position[1]) {
                result = true;
                break;
            }
        }
        return result;
    }

    // Generate a unique key for a position
    getKey(pos) {
        return pos[0] + "," + pos[1];
    }

    // Possible rooms are the dotted areas beyond the door
    // this returns an array of positions
    getPossibleRooms(rooms) {
        var result = [];
        for (var i = 0; i < rooms.length; i++) {
            var room = rooms[i];
            var exits = room.room.Exits;
            if (exits.indexOf("N") >= 0) {
                var posN = [room.position[0], room.position[1] - 1];
                if (!this.roomOrPossibleExists(posN, rooms, result)) {
                    result.push({ position: posN, key: this.getKey(posN) });
                }
            }
            if (exits.indexOf("S") >= 0) {
                var posS = [room.position[0], room.position[1] + 1];
                if (!this.roomOrPossibleExists(posS, rooms, result)) {
                    result.push({ position: posS, key: this.getKey(posS) });
                }
            }
            if (exits.indexOf("E") >= 0) {
                var posE = [room.position[0] + 1, room.position[1]];
                if (!this.roomOrPossibleExists(posE, rooms, result)) {
                    result.push({ position: posE, key: this.getKey(posE) });
                }
            }
            if (exits.indexOf("W") >= 0) {
                var posW = [room.position[0] - 1, room.position[1]];
                if (!this.roomOrPossibleExists(posW, rooms, result)) {
                    result.push({ position: posW, key: this.getKey(posW) });
                }
            }
        }
        return result;
    }

    // At the start there are three rooms on the ground floor
    // and one upstairs
    getStartRooms(floor) {
        var result = null;
        if (floor === "Ground") {
            result = [
                { position: [1, 0], room: this.props.rooms.find(item => item.Name === "Entrance Hall") },
                { position: [0, 0], room: this.props.rooms.find(item => item.Name === "Foyer") },
                { position: [-1, 0], room: this.props.rooms.find(item => item.Name === "Grand Staircase") }
            ]
        } else if (floor === "Upper") {
            result = [
                { position: [0, 0], room: this.props.rooms.find(item => item.Name === "Upper Landing") }
            ]
        }
        return result;
    }

    getRoomsInfloor(floor) {
        var result = this.state.groundRooms;
        if (floor === "Upper") {
            result = this.state.upperRooms;
        } else if (floor === "Basement") {
            result = this.state.basementRooms;
        }
        return result;
    }

    // When a room is placed it gets a position
    // This will return the position of a room that 
    // has been placed
    getPosition(room, floor) {
        var roomsInFloor = this.getRoomsInfloor(floor)
        var roomInFloor = roomsInFloor.find(item => item.room.Name === room.Name)
        return roomInFloor.position;
    }

    positionInSet(position, positions) {
        var result = false;
        for (var i = 0; i < positions.length; i++) {
            if (positions[i].position[0] === position[0] && positions[i].position[1] === position[1]) {
                result = true
                break;
            }
        }
        return result;
    }

    rotateExits(exits, degrees) {
        var result = exits.replace('N', 'N1').replace('E', 'E1').replace('S', 'S1').replace('W', 'W1')
        switch (degrees) {
            case 90:
                result = result.replace('N1', 'E').replace('E1', 'S').replace('S1', 'W').replace('W1', 'N')
                break
            case 180:
                result = result.replace('N1', 'S').replace('E1', 'W').replace('S1', 'N').replace('W1', 'E')
                break
            case 270:
                result = result.replace('N1', 'W').replace('E1', 'N').replace('S1', 'E').replace('W1', 'S')
                break
            default:
        }
        return result;
    }

    // Return the direction (N,S, E, W) of the door 
    // Expected to be in the destination when moving
    // from another room
    getExpectedEntry(roomFrom, roomDestination) {
        var result = 'N';
        if (roomFrom.position[0] === roomDestination.position[0]) {
            // must be N or S
            if (roomFrom.position[1] > roomDestination.position[1]) {
                result = 'S'
            }
        } else {
            // must be E or W
            if (roomFrom.position[0] > roomDestination.position[0]) {
                result = 'E'
            } else {
                result = 'W'
            }
        }
        return result
    }

    roomHasEntry(roomFrom, roomDestination) {
        var expectedEntry = this.getExpectedEntry(roomFrom, roomDestination)
        var result = roomDestination.room.Exits.indexOf(expectedEntry) >= 0;
        return result;
    }

    rotateDestinationRoomToGetEntry(roomFrom, roomDestination) {
        var result = true
        if (!this.roomHasEntry(roomFrom, roomDestination)) {
            var origExits = roomDestination.room.Exits
            roomDestination.room.Exits = this.rotateExits(origExits, 90)
            if (!this.roomHasEntry(roomFrom, roomDestination)) {
                roomDestination.room.Exits = this.rotateExits(origExits, 180)
                if (!this.roomHasEntry(roomFrom, roomDestination)) {
                    roomDestination.room.Exits = this.rotateExits(origExits, 270)
                    if (!this.roomHasEntry(roomFrom, roomDestination)) {
                        roomDestination.room.rotation = 270    
                    } else {
                        result = false;
                    }
                } else {
                    roomDestination.room.rotation = 180 
                      
                }
            } else {
                roomDestination.room.rotation = 90
            }
        }
        return result
    }

    addRoomToFloor(floor, position, room, currentPlayerRoomPos) {
        var roomDestination = {
            position: position,
            room: room
        }
        this.rotateDestinationRoomToGetEntry(currentPlayerRoomPos, roomDestination)
        if (floor === "Ground") {
            var gRooms = [...this.state.groundRooms, roomDestination];
            this.setState(state => ({
                groundRooms: gRooms,
                groundPossibleRooms: this.getPossibleRooms(gRooms)
            }))
        } else if (floor === "Upper") {
            var uRooms = [...this.state.upperRooms, roomDestination]
            this.setState(state => ({
                upperRooms: uRooms,
                upperPossibleRooms: this.getPossibleRooms(uRooms)
            }))
        } else {
            var bRooms = [...this.state.basementRooms, roomDestination]
            this.setState(state => ({
                basementRooms: bRooms,
                basementPossibleRooms: this.getPossibleRooms(bRooms)
            }))
        }
    }

    // get position + room of current player
    getCurrentPlayerRoomPos(floor) {
        var currentPlayerRoom = this.props.currentPlayer.Room;
        var currentPlayerPosition = this.getPosition(currentPlayerRoom, floor)
        var result = { position: currentPlayerPosition, room: currentPlayerRoom }
        return result;
    }


    // Take a room out of the room stack
    // and update state accordingly
    takeRoomFromStack(floor) {
        var rooms = this.state.roomStack;
        var room = this.extractRandomRoom(rooms, floor)
        this.setState(state => ({
            roomStack: rooms // The room is taken out of the stack
        }))
        return room;
    }


    // If the possible room that was clicked is a valid
    // place for a new room to be placed then grab a
    // random room from the stack and put it there
    // then put the player in that room
    selectPossibleRoom(floor, position) {
        if (this.props.currentPlayer.movement > 0) {
            var currentPlayerRoomPos = this.getCurrentPlayerRoomPos(floor)
            var possibleRooms = this.getPossibleRooms([currentPlayerRoomPos])
            var positionInSet = this.positionInSet(position, possibleRooms)
            if (positionInSet) {
                // The possible room that was clicked is valid
                var room = this.takeRoomFromStack(floor)
                this.addRoomToFloor(floor, position, room, currentPlayerRoomPos)
                // Put the current player in the new room
                this.moveCurrentPlayer(room)
            }
        }
    }

    // Can only move 1 space NSEW
    getDirectionTravelled(posFrom, posTo) {
        var result = null;
        if (posTo[0] === posFrom[0]) {
            if (posTo[1] === posFrom[1] + 1) {
                result = "S";
            } else if (posTo[1] === posFrom[1] - 1) {
                result = "N"
            }
        } else if (posTo[1] === posFrom[1]) {
            if (posTo[0] === posFrom[0] + 1) {
                result = "E";
            } else if (posTo[0] === posFrom[0] - 1) {
                result = "W"
            }
        }
        return result;
    }

    // Can enter rooms where there are doors from
    // this room and an entry door on the other side    
    selectRoom(floor, position, room) {
        if (this.props.currentPlayer.movement > 0) {
            var currentPlayerRoomPos = this.getCurrentPlayerRoomPos(floor)
            var directionTo = this.getDirectionTravelled(currentPlayerRoomPos.position, position)
            var directionBack = this.getDirectionTravelled(position, currentPlayerRoomPos.position)
            if (directionTo && directionBack) {
                if (currentPlayerRoomPos.room.Exits.indexOf(directionTo) >= 0) {
                    if (room.Exits.indexOf(directionBack) >= 0) {
                        this.moveCurrentPlayer(room)
                    }
                }
            }
        }
    }

    moveCurrentPlayer(room) {
        this.props.moveCurrentPlayer(room)
    }

    render() {
        var basementClassName = "floor basement" + (this.state.activeFloor === "Baseemnt" ? "active" : "")
        var groundFloorClassName = "floor ground" + (this.state.activeFloor === "Ground" ? " active" : "");
        var upperClassName = "floor upper" + (this.state.activeFloor === "Upper" ? " active" : "");
        return (
            <div className="floors">
                <div className={upperClassName}>
                    <h2>Upper</h2>
                    <Floor
                        height={this.props.height}
                        roomSize={120}
                        rooms={this.state.upperRooms}
                        possibleRooms={this.state.upperPossibleRooms}
                        players={this.state.upperPlayers}
                        currentPlayer={this.props.currentPlayer}
                        character={this.props.character}
                        floor={"Upper"}
                        selectPossibleRoom={this.selectPossibleRoom}
                    />
                </div>
                <div className={groundFloorClassName}>
                    <h2>Ground</h2>
                    <Floor
                        height={this.props.height}
                        roomSize={120}
                        rooms={this.state.groundRooms}
                        possibleRooms={this.state.groundPossibleRooms}
                        players={this.state.groundPlayers}
                        currentPlayer={this.props.currentPlayer}
                        character={this.props.character}
                        floor={"Ground"}
                        selectPossibleRoom={this.selectPossibleRoom}
                        selectRoom={this.selectRoom}
                    />
                </div>
                <div className={basementClassName}>
                    <h2>Basement</h2>
                    <Floor
                        height={this.props.height}
                        roomSize={120}
                        rooms={this.state.basementRooms}
                        possibleRooms={this.state.basementRooms}
                        players={this.state.basementPlayers}
                        currentPlayer={this.props.currentPlayer}
                        character={this.props.character}
                        floor={"Basement"}
                        selectPossibleRoom={this.selectPossibleRoom}
                    />
                </div>
            </div>
        );
    }
}

export default Floors;