import React from 'react';
import Stat from './Stat/Stat';
import "./Character.css";

class Character extends React.Component {

    speeds = null;
    mights = null;
    sanitys = null;
    knowledges = null;


    constructor(props) {
        super(props);
        this.speeds = this.getArray(props.character.Speed);
        this.mights = this.getArray(props.character.Might);
        this.sanitys = this.getArray(props.character.Sanity);
        this.knowledges = this.getArray(props.character.Knowledge);
        this.state = {
            compact: props.compact,
            speedIdx: this.speeds.idx,
            mightIdx: this.mights.idx,
            sanityIdx: this.sanitys.idx,
            knowledgeIdx: this.knowledges.idx
        };
        this.toggleDisplayContext = this.toggleDisplayContext.bind(this);
        this.changeValue = this.changeValue.bind(this)
    }

    updateStats() {
        this.speeds = this.getArray(this.props.character.Speed);
        this.mights = this.getArray(this.props.character.Might);
        this.sanitys = this.getArray(this.props.character.Sanity);
        this.knowledges = this.getArray(this.props.character.Knowledge);
        this.setState(state => ({
            speedIdx: this.speeds.idx,
            mightIdx: this.mights.idx,
            sanityIdx: this.sanitys.idx,
            knowledgeIdx: this.knowledges.idx
        }))
    }

    toggleDisplayContext(e) {
        e.preventDefault();
        this.setState(state => ({
            compact: !this.state.compact
        }));
    }

    getArray(itemArray) {
        var result = {
            items: [],
            idx: null,
            getItem: function () {
                return this.items[this.idx];
            },
            isDead: function () {
                return this.idx > this.items.length || this.idx < 0;
            }
        };
        for (var i = 0; i < itemArray.length - 1; i++) { // last value is index to array
            result.items.push({
                idx: i,
                value: itemArray[i]
            });
        }
        result.idx = itemArray[itemArray.length - 1] - 1;
        return result;
    }

    image() {
        let name = this.props.character.Name;
        let src = "img/Characters/" + name.replace(/[^A-Za-z]/g, "") + ".jpg"
        return <img src={src} alt={name} />
    }

    changeValue(valueType, amount, e) {
        e.preventDefault()
        this.props.changeValue(valueType, amount)
        this.updateStats()
    }

    stats() {
        return <div className="stats">
            <Stat title="Speed" changeValue={this.changeValue} items={this.speeds.items} itemIdx={this.state.speedIdx} allowManage={this.props.allowManage}/>
            <Stat title="Might" changeValue={this.changeValue} items={this.mights.items} itemIdx={this.state.mightIdx}  allowManage={this.props.allowManage}/>
            <Stat title="Sanity" changeValue={this.changeValue} items={this.sanitys.items} itemIdx={this.state.sanityIdx}  allowManage={this.props.allowManage}/>
            <Stat title="Knowledge" changeValue={this.changeValue} items={this.knowledges.items} itemIdx={this.state.knowledgeIdx}  allowManage={this.props.allowManage}/>
        </div>
    }

    renderFull() {
        return <div className={"character "} onClick={this.toggleDisplayContext}>
            <div className="portrait">
                {this.image()}
            </div>
            <div className="info">
                <ul>
                    <li><span className="title">Name:</span> {this.props.character.Name}</li>
                    <li><span className="title">Age:</span> {this.props.character.Age}</li>
                    <li><span className="title">Birthday:</span> {this.props.character.Birthday[2]}</li>
                    <li><span className="title">Hobbies:</span> {this.props.character.Hobbies}</li>
                    <li><span className="title">Fears:</span> {this.props.character.Fears}</li>
                </ul>
            </div>
            
            {this.stats()}
        </div>
    }

    renderCompact() {
        return <div className={"character"} >
            <div className="portrait" onClick={this.toggleDisplayContext}>
                {this.image()}
            </div>
            <div className="info">
                {this.props.character.Name}
                {this.stats()}
            </div>
        </div>
    }

    render() {
        return this.state.compact ? this.renderCompact() : this.renderFull();
    }
}

export default Character;