import React from 'react';
import "./Stat.css";

class Stat extends React.Component {
    constructor(props) {
        super(props);
    }

    subtractButton() {
        var result = null;
        if (this.props.allowManage) {
            result = <div className="subtract">
            <a href="#" onClick={(e) => this.props.changeValue(this.props.title, 1, e)}><i className="fas fa-minus"></i></a>
            </div>
        }
        return result;
    }
    addButton() {
        var result = null;
        if (this.props.allowManage) {
            result = <div className="add">
            <a href="#" onClick={(e) => this.props.changeValue(this.props.title, -1, e)}><i className="fas fa-plus"></i></a>
            </div>
        }
        return result;
    }

    render() {
        return <div className="stat">
            <div className="title">{this.props.title}</div>
            {this.addButton()}
            {this.props.items.map(item => (
                <div key={item.idx} className={"value" + (item.idx === this.props.itemIdx ? " active" : "")}>{item.value}</div>
            ))}
            <div className="dead"><i className="fas fa-skull"></i></div>
            {this.subtractButton()}
        </div>
    }
}
export default Stat;