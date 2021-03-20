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

  deleteCharacter = (id) => {
    characterData.deletePC(id)
      .then(() => { this.getCharacters(); })
      .catch((err) => console.error(err));
  }

  goToCharacterForm = (e) => {
    e.preventDefault();
    this.props.history.push('/character-form');
  }

  render() {
    const { players } = this.state;
    const { history } = this.props;
    const buildCards = players.map((character) => <CharacterCard deleteCharacter={this.deleteCharacter} history={history} character={character} key={character.id} />);

    return (
          <div>
            <h1>Player Characters</h1>
            <button onClick={this.goToCharacterForm} className='btn btn-primary'>Create Player Character</button>
            <div className="characterContainer">
              { buildCards }
            </div>
          </div>
    );
  }
}

export default Characters;
