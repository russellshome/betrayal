import React from 'react'
import Rooms from "./Room.json"
import Room from "./Room.js"

class RoomCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: Rooms
    };
  }


  render() {
    return (
      <div className="collection room-collection">
        {this.state.rooms.map(item => (
          <Room key={item.Name} data={item} />
        ))}
      </div>
    );
  }
}

export default RoomCollection;