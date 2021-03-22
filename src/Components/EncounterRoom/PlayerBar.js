/* eslint-disable max-len */
import React from 'react';
import { Table } from 'reactstrap';
import playerData from '../../Helpers/data/pcData';

class PlayerBar extends React.Component {
  state = {
    characterData: [],
    initiative: 0,
    concentration: false,
    currentHealth: 0,
  }

  getData = () => {
    const { char } = this.props;
    playerData.getOnePC(char.characterId.id)
      .then((res) => this.setState({ characterData: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { char } = this.props;
    this.getData();
    this.setState({ currentHealth: char.currentHealth, initiative: char.initiative });
  }

  updateButton = () => {
    const { updatePlayerPair, char } = this.props;
    const {
      initiative, concentration, currentHealth,
    } = this.state;
    const currentHP = Number(currentHealth);
    const currentInni = Number(initiative);
    const pairObj = {
      initiative: currentInni, concentration, currentHealth: currentHP,
    };
    updatePlayerPair(char.id, pairObj);
  }

  updateHP = (e) => {
    e.preventDefault();
    this.setState({ currentHealth: e.target.value });
  }

  updateConcenration = (e) => {
    e.preventDefault();
    this.setState({ concentration: e.target.value });
  }

  updateIni = (e) => {
    e.preventDefault();
    this.setState({ initiative: e.target.value });
  }

  render() {
    const { char } = this.props;
    const { characterData } = this.state;
    return (
      <div className="card player-card container">
      <div className="card-body">
        <h4 className="card-title">{char.characterId.name}</h4>
        <h6 className="card-subtitle mb-2 text-muted"> Level: {char.characterId.level} {char.characterId.characterClass}</h6>
        <div className="row justify-content-around">
          <div className='stat'>
          <i className="fas fa-heart"></i> HP:
            <input onChange={this.updateHP} type='number' defaultValue={char.currentHealth}></input>
            /{char.characterId.maxHP}
          </div>
          <div className='stat'>
            <i className="fas fa-shield-alt"></i> AC:{char.characterId.AC}
          </div>
          <div className='stat'>
            <i className="fas fa-shoe-prints"></i>Speed:{char.characterId.speed}
          </div>
          <div>
            <i class="fas fa-hourglass-half"></i>
            <label>Initiative: <input onChange={this.updateIni} type="number" defaultValue={char.initiative}></input> </label>
          </div>
      </div>
      <div className="row justify-content-between">
        <div className='stat'>
          <h5>Stat Modifiers:</h5>
          <Table>
            <thead>
              <tr>
                <th>STR</th>
                <th>DEX</th>
                <th>CON</th>
                <th>INT</th>
                <th>WIS</th>
                <th>CHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {characterData.strengthStat} ({ characterData.strength_mod >= 0 ? `+${characterData.strength_mod}` : `${characterData.strength_mod}` })</td>
                <td> {characterData.dexterityStat} ({ characterData.dexterity_mod >= 0 ? `+${characterData.dexterity_mod}` : `${characterData.dexterity_mod}` })</td>
                <td> {characterData.constitutionStat} ({ characterData.constitution_mod >= 0 ? `+${characterData.constitution_mod}` : `${characterData.constitution_mod}` })</td>
                <td> {characterData.intelligenceStat} ({ characterData.intelligence_mod >= 0 ? `+${characterData.intelligence_mod}` : `${characterData.intelligence_mod}` })</td>
                <td> {characterData.wisdomStat} ({characterData.wisdom_mod >= 0 ? `+${characterData.wisdom_mod}` : `${characterData.wisdom_mod}` })</td>
                <td> {characterData.charismaStat} ({ characterData.charisma_mod >= 0 ? `+${characterData.charisma_mod}` : `${characterData.charisma_mod}` })</td>

              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          { characterData.spellSave_DC === 0 ? <div></div> : <h5>Spell Save DC: {characterData.spellSave_DC} </h5> }
        </div>
        <div className='stat'>
          <h5>Saving Throws:</h5>
          <Table>
            <thead>
              <tr>
                <th>STR</th>
                <th>DEX</th>
                <th>CON</th>
                <th>INT</th>
                <th>WIS</th>
                <th>CHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> { characterData.strength_ST >= 0 ? `+${characterData.strength_ST}` : `${characterData.strength_ST}` }</td>
                <td> { characterData.dexterity_ST >= 0 ? `+${characterData.dexterity_ST}` : `${characterData.dexterity_ST}` }</td>
                <td> { characterData.constitution_ST >= 0 ? `+${characterData.constitution_ST}` : `${characterData.constitution_ST}` }</td>
                <td> { characterData.intelligence_ST >= 0 ? `+${characterData.intelligence_ST}` : `${characterData.intelligence_ST}` }</td>
                <td> { characterData.wisdom_ST >= 0 ? `+${characterData.wisdom_ST}` : `${characterData.wisdom_ST}` }</td>
                <td> { characterData.charisma_ST >= 0 ? `+${characterData.charisma_ST}` : `${characterData.charisma_ST}` }</td>

              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <button onClick={this.updateButton} className="btn btn-success">save</button>
    </div>
  </div>
    );
  }
}

export default PlayerBar;
