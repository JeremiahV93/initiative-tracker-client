import React from 'react';
import monsterData from '../../Helpers/data/monsterData';

class MonsterBar extends React.Component {
  state = {
    characterData: [],
    initiative: 0,
    concentration: false,
    currentHealth: 0,
  }

  getData = () => {
    const { char } = this.props;
    monsterData.getOneMonster(char.monsterId.id)
      .then((res) => this.setState({ characterData: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    const { char } = this.props;
    this.getData();
    this.setState({ currentHealth: char.currentHealth, initiative: char.initiative });
  }

  updateButton = () => {
    const { updatePair, char } = this.props;
    const {
      initiative, concentration, currentHealth,
    } = this.state;
    const pairObj = {
      monster: true, initiative, concentration, currentHealth, pairId: char.id,
    };
    updatePair(pairObj);
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

  deleteButton = (e) => {
    e.preventDefault();
    const { deletePair, char } = this.props;
    const obj = { monsterId: char.id };
    deletePair(obj);
  }

  render() {
    const { char } = this.props;
    const { characterData } = this.state;

    return (
      <div className="card container">
      <div className="card-body">
        <h4 className="card-title">{char.monsterId.name}</h4>
        <h6 className="card-subtitle mb-2 text-muted"> Type: {char.monsterId.monsterType} Challenge Rating: {char.monsterId.challengeRating} Size: {char.monsterId.size} </h6>
        <div className="row justify-content-around">
          <div className='stat'>
          <i className="fas fa-heart"></i> HP:
            <input onChange={this.updateHP} type='number' defaultValue={char.currentHealth}></input>
            /{char.monsterId.maxHP}
          </div>
          <div className='stat'>
            <i className="fas fa-shield-alt"></i> AC:{char.monsterId.AC}
          </div>
          <div className='stat'>
            <i className="fas fa-shoe-prints"></i>Speed:{char.monsterId.speed}
          </div>
          <div>
            <label>Initiative: <input type="number" onChange={this.updateIni} defaultValue={char.initiative}></input> </label>
          </div>
      </div>
      <div className="row justify-content-between">
        <div className='stat'>
          <h5>Stat Modifiers:</h5>
          <div className='throw'>
              STR: {characterData.strength_mod} DEX:  {characterData.dexterity_mod} CON:  {characterData.constitution_mod}
              INT:  {characterData.intellidence_mod} WIS:  {characterData.wisdom_mod} CHA:  {characterData.charisma_mod}
            </div>
        </div>
        <div className='stat'>
          <h5>Saving Throws:</h5>
          <div className='throw'>
            STR: {characterData.strength_savingthrow} DEX:  {characterData.dexterity_savingthrow} CON:  {characterData.constitution_savingthrow}
            INT:  {characterData.intellidence_savingthrow} WIS:  {characterData.wisdom_savingthrow} CHA:  {characterData.charisma_savingthrow}
            </div>
        </div>
      </div>
      <button onClick={this.updateButton} className="btn btn-success">save</button>
    </div>
  </div>
    );
  }
}

export default MonsterBar;
