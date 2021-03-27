import React from 'react'
import Character from "./Character/Character"
import PlayerRoom from "./PlayerRoom"


class Player extends React.Component {
    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this)
    }

    changeValue(valueType, amount) {
        this.props.changeValue(valueType, amount)
    }

    render() {
        return (
            <div className="player">
                <Character character={this.props.character} compact={true} allowManage={true} changeValue={this.changeValue}/>
                <PlayerRoom room={this.props.character.Room} currentPlayer={this.props.currentPlayer}/>
            </div>
        )
    }
}

export default Player