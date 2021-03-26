import React from 'react';
import Omen from "./Omen.js";
import Omens from "./Omen.json";

class OmenCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      omens: Omens
    };
  }

  render() {
    return (
      <>
        {this.state.omens.map(item => (
          <Omen key={item.Name} data={item} />
        ))}
      </>
    );
  }
}


export default OmenCollection;