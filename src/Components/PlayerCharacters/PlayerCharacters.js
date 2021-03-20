import React from 'react';
import characterData from '../../Helpers/data/pcData';
import CharacterCard from './CharacterCards';
import './character.scss';

class Characters extends React.Component {
  state = {
    players: [],
  }

  getCharacters = () => {
    characterData.getAllPCs()
      .then((res) => this.setState({ players: res.data }));
  }

  componentDidMount() {
    this.getCharacters();
  }

  render() {
    const { players } = this.state;

    const buildCards = players.map((character) => <CharacterCard character={character} key={character.id} />);

    return (
          <div>
            <h1>Player Characters</h1>
            Need to make a for to update/add, and a delete button.
            <div className="characterContainer">
              { buildCards }
            </div>
          </div>
    );
  }
}

export default Characters;
