import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup,
} from 'reactstrap';
import characterData from '../../Helpers/data/pcData';
import encounterData from '../../Helpers/data/encounterData';
import pairData from '../../Helpers/data/encounterPair';
import CharacterCard from './CharacterCards';

import './character.scss';

class Characters extends React.Component {
  state = {
    players: [],
    encounters: [],
    modal: false,
    encounterId: null,
    playerId: null,
  }

  getEncountersForModal = () => {
    encounterData.getAllActiveEncounters()
      .then((res) => {
        this.setState({ encounters: res.data });
      })
      .catch((err) => console.error(err));
  }

  getCharacters = () => {
    characterData.getAllPCs()
      .then((res) => this.setState({ players: res.data }));
  }

  componentDidMount() {
    this.getCharacters();
    this.getEncountersForModal();
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

  updateEncounterId = (e) => {
    e.preventDefault();
    this.setState({ encounterId: e.target.value });
  }

  createEncounterPair = (e) => {
    e.preventDefault();
    const { encounterId, characterId } = this.state;
    const pairObj = { encounterId, characterId, monsterId: '' };
    const jsonObj = JSON.stringify(pairObj);
    pairData.createPair(jsonObj)
      .then((res) => {
        this.setState({
          encounterId: null, characterId: null, modal: false,
        });
        this.getEncountersForModal();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      players, modal, encounters, campaignId,
    } = this.state;
    const { history, className } = this.props;
    const toggle = () => this.setState({ modal: !modal });

    const openModal = (cid, characterId) => {
      this.setState({ characterId, campaignId: cid.id });
      toggle();
    };

    const buildCards = players.map((character) => <CharacterCard deleteCharacter={this.deleteCharacter} history={history} openModal={openModal} character={character} key={character.id} />);

    return (
          <div>
            <h1>Player Characters</h1>
            <button onClick={this.goToCharacterForm} className='btn btn-primary'>Create Player Character</button>
            <div className="characterContainer">
              { buildCards }
            </div>
            <div>
              <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Assign Character to an Encounter</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label> Add Character to an Encounter </Label>
                        <Input onChange={this.updateEncounterId} type="select" >
                          <options>Encounter options</options>
                          {encounters.filter((encounter) => encounter.campaign.id === campaignId).map((encounter) => <option value={encounter.id} >{encounter.name}</option>)}
                        </Input>
                    </FormGroup>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.createEncounterPair}>Assign to Encounter</Button>{' '}
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
    );
  }
}

export default Characters;
