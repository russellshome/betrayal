import React from 'react';
import Character from "./Character.js";
import Characters from "./Character.json"

class CharacterCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: Characters
    };

  }

  nextBirthDate(now, day, month) {
    var result = new Date(now.getFullYear(), month - 1, day);
    if (now > result) {
      // we are past that date this year so next birthday must be next year
      result.setFullYear(now.getFullYear() + 1);
    }
    return result;
  }

  nextBirthdayCharacter() {
    var now = new Date();
    var result = this.state.characters[0];
    var nextBirthday = this.nextBirthDate(now, result.props.character.Birthday[0], result.props.character.Birthday[1]);
    for (var i = 1; i < this.state.characters.length; i++) {
      var char = this.state.characters[i];
      var charBirthDay = this.nextBirthDate(now, char.props.character.Birthday[0], char.props.character.Birthday[1]);
      if (charBirthDay < nextBirthday) {
        nextBirthday = charBirthDay;
        result = char;
      }
    }
    return result;
  }

  render() {
    return (
      <div className="collection character-collection">
        {this.state.characters.map(item => (
          <Character key={item.Name} data={item} displayContext="Compact"/>
        ))}
      </div>
    );
  }
}

export default CharacterCollection;