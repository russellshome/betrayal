import React from 'react';
import Counter from './Counter/Counter';
import Character from "../../Player/Character/Character"
import "./Room.css";

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCounterName: null,
        };
        //this.rotate = this.rotate.bind(this);
        this.selectCounter = this.selectCounter.bind(this);
        this.selectPossibleRoom = this.selectPossibleRoom.bind(this)
        this.selectRoom = this.selectRoom.bind(this)
    }

    /*
    rotate(e) {
        e.preventDefault();
        this.setState(state => ({
            rotation: this.state.rotation + 90 >= 360 ? 0 : this.state.rotation + 90
        }));
    }
    */

    selectCounter(name) {
        var result = this.state.currentCounterName;
        if (name === this.state.currentCounterName) {
            result = null
        } else {
            result = name
        }
        this.setState(state => ({
            currentCounterName: result
        }))
        return result;
    }


    image() {
        let src = "img/Rooms/" + this.props.data.Name.replace(/[^A-Za-z]/g, "") + ".jpg"
        return <img className={"r" + (this.props.rotation ? this.props.rotation : 0)} src={src} alt={this.props.data.Name} />
    }

    getCounterName(player) {
        var result = player.Name.substr(0, 1);
        var idx = player.Name.indexOf(" ");
        result += player.Name.substr(idx + 1, 1)
        return result;
    }
    
    selectPossibleRoom() {
        this.props.selectPossibleRoom(this.props.floor, this.props.position);      
    }
    selectRoom() {
        this.props.selectRoom(this.props.floor, this.props.position, this.props.data);      
    }


    getRoom() {
        //console.log(this.props.currentPlayer)
        //console.log(this.props.character)
        var result;
        if (this.props.data) {
            result = <div className="room interior" 
            style={this.props.style}
            onClick={this.selectRoom}
            >
            {this.image()}
            <div className="players">
                {this.props.players.map(player => (
                    <Counter
                        key={player.Name}
                        name={this.getCounterName(player)}
                        colour={player.Colour}
                        hidden={this.state.currentCounterName !== this.getCounterName(player)}
                        selectCounter={this.selectCounter}
                    >
                        <Character character={player} compact={true} />
                    </Counter>
                ))}
            </div>
            <button className="rotate" onClick={this.rotate}>
                <i className="fas fa-redo"></i>
            </button>
        </div>
        } else {
            result = <div 
                className="possible interior" 
                style={this.props.style}
                onClick={this.selectPossibleRoom}    
                >      
            </div>
        }
        return result;
    }

    render() {
        return this.getRoom();
    }
}

export default Room;