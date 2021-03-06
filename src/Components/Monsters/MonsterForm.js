/* eslint-disable camelcase */
import React from 'react';
import monsterData from '../../Helpers/data/monsterData';

class MonsterForm extends React.Component {
  state = {
    challengeRatings: [],
    monsterTypes: [],
    name: '',
    AC: 0,
    maxHP: 0,
    initiativeBonus: 0,
    strengthStat: 0,
    dexterityStat: 0,
    constitutionStat: 0,
    intelligenceStat: 0,
    wisdomStat: 0,
    charismaStat: 0,
    challengeRating: 0,
    conditionImmunity: '',
    damageImmunity: '',
    damageResistance: '',
    stregnth_savingthrow: 0,
    dexterity_savingthrow: 0,
    constitution_savingthrow: 0,
    intelligence_savingthrow: 0,
    wisdom_savingthrow: 0,
    charisma_savingthrow: 0,
    size: '',
    speed: '',
    monsterType: '',
  }

  CRUpdate = (e) => {
    e.preventDefault();
    this.setState({ challengeRating: e.target.value });
  }

  typeUpdate = (e) => {
    e.preventDefault();
    this.setState({ monsterType: e.target.value });
  }

  speedUpdate = (e) => {
    e.preventDefault();
    this.setState({ speed: e.target.value });
  }

  sizeUpdate = (e) => {
    e.preventDefault();
    this.setState({ size: e.target.value });
  }

  chaSTUpdate = (e) => {
    e.preventDefault();
    this.setState({ charisma_savingthrow: e.target.value });
  }

  wisSTUpdate = (e) => {
    e.preventDefault();
    this.setState({ wisdom_savingthrow: e.target.value });
  }

  intSTUpdate = (e) => {
    e.preventDefault();
    this.setState({ intelligence_savingthrow: e.target.value });
  }

  conSTUpdate = (e) => {
    e.preventDefault();
    this.setState({ constitution_savingthrow: e.target.value });
  }

  dexSTUpdate = (e) => {
    e.preventDefault();
    this.setState({ dexterity_savingthrow: e.target.value });
  }

  strSTUpdate = (e) => {
    e.preventDefault();
    this.setState({ stregnth_savingthrow: e.target.value });
  }

  dmgImmunUpdate = (e) => {
    e.preventDefault();
    this.setState({ damageImmunity: e.target.value });
  }

  dmgResistUpdate = (e) => {
    e.preventDefault();
    this.setState({ damageResistance: e.target.value });
  }

  conditionUpdate = (e) => {
    e.preventDefault();
    this.setState({ conditionImmunity: e.target.value });
  }

  chaUpdate = (e) => {
    e.preventDefault();
    this.setState({ charismaStat: e.target.value });
  }

  wisUpdate = (e) => {
    e.preventDefault();
    this.setState({ wisdomStat: e.target.value });
  }

  intUpdate = (e) => {
    e.preventDefault();
    this.setState({ intelligenceStat: e.target.value });
  }

  conUpdate = (e) => {
    e.preventDefault();
    this.setState({ constitutionStat: e.target.value });
  }

  dexUpdate = (e) => {
    e.preventDefault();
    this.setState({ dexterityStat: e.target.value });
  }

  strStatUpdate = (e) => {
    e.preventDefault();
    this.setState({ strengthStat: e.target.value });
  }

  initiativeUpdate = (e) => {
    e.preventDefault();
    this.setState({ initiativeBonus: e.target.value });
  }

  healthUpdate = (e) => {
    e.preventDefault();
    this.setState({ maxHP: e.target.value });
  }

  acUpdate = (e) => {
    e.preventDefault();
    this.setState({ AC: e.target.value });
  }

  nameUpdate = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  getMonsterTypes = () => {
    monsterData.getMonsterTypes()
      .then((res) => this.setState({ monsterTypes: res.data }))
      .catch((err) => console.error(err));
  }

  getMonsterchallengeRatings = () => {
    monsterData.getMonsterCRs()
      .then((res) => this.setState({ challengeRatings: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getMonsterchallengeRatings();
    this.getMonsterTypes();
  }

  createMonster = (e) => {
    e.preventDefault();
    const {
      challengeRatings,
      monsterTypes,
      name,
      AC,
      maxHP,
      initiativeBonus,
      strengthStat,
      dexterityStat,
      constitutionStat,
      intelligenceStat,
      wisdomStat,
      charismaStat,
      challengeRating,
      conditionImmunity,
      damageImmunity,
      damageResistance,
      stregnth_savingthrow,
      dexterity_savingthrow,
      constitution_savingthrow,
      intelligence_savingthrow,
      wisdom_savingthrow,
      charisma_savingthrow,
      size,
      speed,
      monsterType,
    } = this.state;
    const monsterObj = {
      challengeRatings,
      monsterTypes,
      name,
      AC,
      maxHP,
      initiativeBonus,
      strengthStat,
      dexterityStat,
      constitutionStat,
      intelligenceStat,
      wisdomStat,
      charismaStat,
      challengeRating,
      conditionImmunity,
      damageImmunity,
      damageResistance,
      stregnth_savingthrow,
      dexterity_savingthrow,
      constitution_savingthrow,
      intelligence_savingthrow,
      wisdom_savingthrow,
      charisma_savingthrow,
      size,
      speed,
      monsterType,
    };
    const jsonObj = JSON.stringify(monsterObj);

    monsterData.createMonster(jsonObj)
      .then(() => this.props.history.push('/monsters'))
      .catch((err) => console.error(err));
  }

  render() {
    const { challengeRatings, monsterTypes } = this.state;
    return (
      <div className="container">
        <form>
          <div className="row">
            <div class="form-group col-4">
              <label >Monster Name:</label>
              <input onChange={this.nameUpdate} type="text" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Max HP:</label>
              <input onChange={this.healthUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Armor Class:</label>
              <input onChange={this.acUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-4">
              <label >Initiative Bonus</label>
              <input onChange={this.initiativeUpdate} type="number" class="form-control" />
              <small class="form-text text-muted">Excluding DEX modifier, such as +5 from the Alert feat.</small>

            </div>
          </div>
          <div className="row">
          <div class="form-group col-2">
              <label >Strength Stat:</label>
              <input onChange={this.strStatUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Dexterity Stat:</label>
              <input onChange={this.dexUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Consitution Stat:</label>
              <input onChange={this.conUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Intelligence Stat:</label>
              <input onChange={this.intUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Wisdom Stat:</label>
              <input onChange={this.wisUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Charisma Stat:</label>
              <input onChange={this.chaUpdate} type="number" class="form-control" />
            </div>
          </div>
          <div className="row">
          <div class="form-group col-2">
              <label >Strength Saving Throw:</label>
              <input onChange={this.strSTUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Dexterity Saving Throw:</label>
              <input onChange={this.dexSTUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Consitution Saving Throw:</label>
              <input onChange={this.conSTUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Intelligence Saving Throw:</label>
              <input onChange={this.intSTUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Wisdom Saving Throw:</label>
              <input onChange={this.wisSTUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Charisma Saving Throw:</label>
              <input onChange={this.chaSTUpdate} type="number" class="form-control" />
            </div>
          </div>
          <div className="row">
            <div class="form-group col-4">
              <label >Damage Resistances:</label>
              <input onChange={this.dmgResistUpdate} type="text" class="form-control" />
            </div>
            <div class="form-group col-4">
              <label >Damage Immunities</label>
              <input onChange={this.dmgImmunUpdate} type="text" class="form-control" />
            </div>
            <div class="form-group col-4">
              <label >Condition Immunities</label>
              <input onChange={this.conditionUpdate} type="text" class="form-control" />
            </div>
          </div>
          <div className="row">
          <div class="form-group col-2">
              <label >Speed:</label>
              <input onChange={this.speedUpdate} type="text" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Size:</label>
              <input onChange={this.sizeUpdate} type="text" class="form-control" />
            </div>
            <div className='form-group col-4'>
            <label>Monster Type:</label>
            <select className="form-control" onChange={this.typeUpdate}>
            <option value={null} >Pick a Type</option>
              <option >undead</option>
              <option >aberration</option>
              <option >beast</option>
              <option >celestial</option>
              <option >construct</option>
              <option >dragon</option>
              <option >elemental</option>
              <option >fey</option>
              <option >fiend</option>
              <option >giant</option>
              <option >humanoid</option>
              <option >monstrosity</option>
              <option >ooze</option>
              <option >plant</option>
            </select>
            </div>
            <div className="form-group col-4">
          <label >Challenge Rating:</label>
            <select className="form-control" onChange={this.CRUpdate}>
            <option value={null} >Pick a CR</option>
              <option value={0.125}>1/8</option>
              <option value={0.25}>1/4</option>
              <option value={0.5}>1/2</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
            </select>
            </div>
          </div>
          <button onClick={this.createMonster} class="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default MonsterForm;
