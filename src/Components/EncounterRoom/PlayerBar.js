/* eslint-disable max-len */
import React from 'react';
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
            <div className='throw'>
              STR: {characterData.strength_mod} DEX:  {characterData.dexterity_mod} CON:  {characterData.constitution_mod} INT:  {characterData.intellidence_mod} WIS:  {characterData.wisdom_mod} CHA:  {characterData.charisma_mod}
            </div>
        </div>
        <div className='stat'>
          <h5>Saving Throws:</h5>
            <div className='throw'>
            STR: {characterData.strength_ST} DEX:  {characterData.dexterity_ST} CON:  {characterData.constitution_ST} INT:  {characterData.intellidence_ST} WIS:  {characterData.wisdom_ST} CHA:  {characterData.charisma_ST}
            </div>
        </div>
      </div>
      <button onClick={this.updateButton} className="btn btn-success">save</button>
    </div>
  </div>
    );
  }
}

export default PlayerBar;
