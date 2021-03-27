import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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

  deleteMonsterPair = (id) => {
    pairData.deleteMonsterPair(id)
      .then((res) => { this.getPlayerMonsterData(); })
      .then((err) => console.error(err));
  }

  deletePlayerPair = (id) => {
    pairData.deletePlayerPair(id)
      .then((res) => { this.getPlayerMonsterData(); })
      .then((err) => console.error(err));
  }

  goToTop = () => {
    window.scroll(0, 0);
  }

  render() {
    const { encounter, characters, encounterId } = this.state;

    const buildAllCards = () => {
      let keyID = 1;
      const characterBars = [];
      characters.forEach((char) => {
        if (char.characterId) {
          characterBars.push(<PlayerBar char={char} encounterId={encounterId} deletePlayerPair={this.deletePlayerPair} updatePlayerPair={this.updatePlayerPair} key={keyID} />);
        } else {
          characterBars.push(<MonsterBar char={char} encounterId={encounterId} deleteMonsterPair={this.deleteMonsterPair} updateMonsterPair={this.updateMonsterPair} key={keyID} />);
        }
        keyID += 1;
      });
      return characterBars;
    };

    return (
      <div>
        <h1> {encounter.name} </h1>
        <h4> You must click the 'Save' button on a Character after a change in Initiative , Concentration, or Current Health.</h4>
        <Container className="roomContainer">
          <Row>
            <Col lg="12">
              {buildAllCards()}
            </Col>
            {/* <Col lg="6">
              Try to get a second column for a note page, and collapsable widgets for status effects
            </Col> */}
          </Row>
        </Container>
        <button type='button' onClick={this.goToTop} className="btn btn-info"> Go to top</button>
      </div>
    );
  }
}

export default EncounterRoom;
