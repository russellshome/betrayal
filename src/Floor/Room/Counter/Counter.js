import React from 'react'
import "./Counter.css"

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.selectCounter = this.selectCounter.bind(this);
    }


    selectCounter() {
        this.props.selectCounter(this.props.name)
    }

    render() {
        return <div className={"countercontainer"}>
            <div className={"counter " + this.props.colour} onClick={this.selectCounter}>
                {this.props.name}
            </div>
            <div className={"counter-item" + (this.props.hidden ? " hide": "")}>
                {this.props.children}
            </div>
        </div>
    }
}

export default Counter