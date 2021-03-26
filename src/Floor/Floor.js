import React from 'react'
import Room from "./Room/Room"


class Floor extends React.Component {
    constructor(props) {
        super(props);
        this.selectPossibleRoom = this.selectPossibleRoom.bind(this)
        this.selectRoom = this.selectRoom.bind(this)
    }

    /*
    Positions start from [0,0] 
    Left is first number negative.
    Up is second number is negative
    Most Neg 0 means the leftmost room
    Most Neg 1 means the topmost room
    */
    getMostNegRoom(idx) {
        var result = null;
        for (var i = 0; i < this.props.rooms.length; i++) {
            if (!result || this.props.rooms[i].position[idx] < result.position[idx]) {
                result = this.props.rooms[i];
            }
        }
        return result;
    }

    getPositionXY(position) {
        var posX = position[0];
        var posY = position[1];
        var roomSize = this.props.roomSize;

        var highPos = this.getMostNegRoom(1).position; // position of topmost room
        var highPosY = highPos[1] - 1; // Starts at 0 -1 for the possible N room
        var absY = Math.abs(highPosY - posY) * roomSize;

        var leftPos = this.getMostNegRoom(0).position; // position of leftmost room
        var leftPosX = leftPos[0] - 1;
        var absX = Math.abs(leftPosX - posX) * roomSize;
        return {
            left: absX,
            top: absY
        }
    }

    getPlayersInRoom(room) {
        var result = [];
        for (var i = 0; i < this.props.players.length; i++) {
            if (room.Name === this.props.players[i].Room.Name) {
                result = [...result, this.props.players[i]]
            }
        }
        return result;
    }

    selectPossibleRoom(floor, position) {
        this.props.selectPossibleRoom(floor, position);        
    }

    selectRoom(floor, position, room) {
        this.props.selectRoom(floor, position, room);        
    }

    render() {
        return (
            <div className="rooms">
                {this.props.rooms.map(item => (
                    <Room
                        key={item.room.Name}
                        data={item.room}
                        style={this.getPositionXY(item.position)}
                        position={item.position}
                        players={this.getPlayersInRoom(item.room)} 
                        rotation={item.room.rotation}      
                        selectRoom={this.selectRoom}                
                    />
                ))}
                {this.props.possibleRooms.map(item => (
                    <Room 
                        key={item.key} 
                        style={this.getPositionXY(item.position)} 
                        position={item.position}
                        floor={this.props.floor}    
                        selectPossibleRoom={this.selectPossibleRoom}       
                    />
                ))}
            </div>
        )
    }
}

export default Floor