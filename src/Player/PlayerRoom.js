import React from 'react'

class PlayerRoom extends React.Component {

    roomLink() {
        let fileName = this.props.room.Name.replace(/[^A-Za-z]/g, "") + ".jpg";
        let src = "img/Rooms/" + fileName
        return <a href={src} data-lightbox={fileName} >
            {this.props.room.Name}
        </a>
    }

    render() {
        console.log(this.props.room)
        return <div className="playerroom">
        You are in: {this.roomLink()}
        <br/>
        Movement remaining: {this.props.currentPlayer.movement}
        </div>
    }
}

export default PlayerRoom