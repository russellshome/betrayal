import React,{Component} from 'react';


class Omen extends Component {
    image() {
        let src = "img/Omens/" + this.props.data.Name.replace(/[^A-Za-z]/g, "") + ".jpg"
        return <img height="375" width="170" src={src} alt={this.props.data.Name}/>
    }

    render() {
        return <div class="boardelement omen">{this.image()} {this.props.data.Name} {this.props.data.Title}</div>
    }
}

export default Omen;