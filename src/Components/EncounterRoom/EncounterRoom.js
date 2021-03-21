import React from 'react';
import pairData from '../../Helpers/data/encounterPair';
import encounterData from '../../Helpers/data/encounterData';
import PlayerBar from './PlayerBar';
import MonsterBar from './MonsterBar';

import './card.scss';

class EncounterRoom extends React.Component {
  state = {
    encounter: [],
    characters: [],
    encounterId: 0,
  }

  getEncounterData = () => {
    encounterData.getOneEncounter(this.props.match.params.encounterId)
      .then((res) => this.setState({ encounter: res.data, encounterId: res.data.id }))
      .catch((err) => console.error(err));
  }

  getPlayerMonsterData = () => {
    pairData.getPairData(this.props.match.params.encounterId)
      .then((res) => {
        const characters = [].concat(res.data.monsters, res.data.players);
        characters.sort((a, b) => b.initiative - a.initiative);
        this.setState({ characters });
      })
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getPlayerMonsterData();
    this.getEncounterData();
  }

  updateMonsterPair = (id, updateObj) => {
    const jsonObj = JSON.stringify(updateObj);
    pairData.updateMonsterPair(id, jsonObj)
      .then((res) => { this.getPlayerMonsterData(); })
      .catch((err) => console.error(err));
  }

  updatePlayerPair = (id, updateObj) => {
    const jsonObj = JSON.stringify(updateObj);
    pairData.updatePlayerPair(id, jsonObj)
      .then((res) => { this.getPlayerMonsterData(); })
      .catch((err) => console.error(err));
  }

  render() {
    const { encounter, characters, encounterId } = this.state;

    const buildCards = characters.map((char) => (
      // eslint-disable-next-line max-len
      char.characterId ? <PlayerBar char={char} encounterId={encounterId} updatePlayerPair={this.updatePlayerPair} key={char.id} /> : <MonsterBar char={char} encounterId={encounterId} updateMonsterPair={this.updateMonsterPair} key={char.id} />));

    return (
      <div className="flex">
        <h1> {encounter.name} </h1>
        <h3>Room Code: {encounter.roomcode} </h3>
        <h4> Please Save after each change in initiative and currentHealth</h4>
        <div className="justify-content-center">
          {buildCards}
        </div>
      </div>
    );
  }
}

export default EncounterRoom;
