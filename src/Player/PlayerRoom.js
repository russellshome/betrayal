import React from 'react'
import $ from "jquery";

class PlayerRoom extends React.Component {
    constructor(props) {
        super(props);
        this.setElementRef = element => {
            var el = $(element).find("a")[0];
            if (el) {
                el.click() // Display card on entry to room
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        console.log("handling!");
    }

    getLink(name, itemType) {
        let fileName = name.replace(/[^A-Za-z]/g, "") + ".jpg";
        let src = "img/" + itemType + "/" + fileName
        return <a href={src} data-lightbox={fileName} onClick={this.handleClick}>
            {name}
        </a>
    }

    getContents() {
        var cards = this.props.currentPlayer.Cards
        var result = [];
        if (cards) {
            if (cards.Event) {
                result.push(
                    <div key={"Event" + cards.Event.Name} ref={this.setElementRef}>
                        An Event: {this.getLink(cards.Event.Name, "Events")}
                    </div>
                )
            }
            if (cards.Items) {
                for (var i = 0; i < cards.Items.length; i++) {
                    result.push(
                        <div key={"Item" + cards.Items[i].Name}  ref={this.setElementRef}>
                            An Item: {this.getLink(cards.Items[i].Name, "Items")}
                        </div>
                    )
                }
            }
            if (cards.Omen) {
                result.push(
                    <div key={"Omen" + cards.Omen.Name}  ref={this.setElementRef}>
                        An Omen: {this.getLink(cards.Omen.Name, "Omens")}
                    </div>
                )
            }
        }
        if (result && result.length) {
            
        }
        return result;
    }

    render() {
        return <div className="playerroom">
            You are in: {this.getLink(this.props.room.Name, "Rooms")}
            <br />
            Movement remaining: {this.props.currentPlayer.movement}
            <br />
            {this.getContents()}
        </div>
    }
}

export default PlayerRoom