import React from 'react';
import "./Stat.css";

class Stat extends React.Component {
    render() {
        return <div className="stat">
            <div className="title">{this.props.title}</div>
            {this.props.items.map(item => (
                <div key={item.idx} className={"value" + (item.idx === this.props.itemIdx ? " active" : "")}>{item.value}</div>
            ))}
            <div className="dead"><i className="fas fa-skull"></i></div>
        </div>
    }
}
export default Stat;