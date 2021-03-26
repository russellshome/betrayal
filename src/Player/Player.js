import React from 'react'
import Character from "./Character/Character"
import PlayerRoom from "./PlayerRoom"

class Player extends React.Component {

    render() {
        return (
            <div className="player">
                <Character character={this.props.character} compact={true}/>
                <PlayerRoom room={this.props.character.Room} currentPlayer={this.props.currentPlayer}/>
            </div>
        )
    }
}

export default Player