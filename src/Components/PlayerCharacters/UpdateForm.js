/* eslint-disable camelcase */
import React from 'react';
import characterData from '../../Helpers/data/pcData';
import campaignData from '../../Helpers/data/campaignData';

class UpdateCharacterForm extends React.Component {
  state = {
    campaigns: [],
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
    level: 1,
    speed: '',
    characterClass: '',
    campaignId: null,
  }

  loadState = () => {
    characterData.getOnePC(this.props.match.params.characterId)
      .then((res) => {
        this.setState({
          characterId: res.data.id,
          name: res.data.name,
          AC: res.data.AC,
          maxHP: res.data.maxHP,
          initiativeBonus: res.data.initiativeBonus,
          strengthStat: res.data.strengthStat,
          dexterityStat: res.data.dexterityStat,
          constitutionStat: res.data.constitutionStat,
          intelligenceStat: res.data.intelligenceStat,
          wisdomStat: res.data.wisdomStat,
          charismaStat: res.data.charismaStat,
          level: res.data.level,
          speed: res.data.speed,
          characterClass: res.data.characterClass,
          campaignId: res.data.campaign,
        });
      })
      .catch((err) => console.error(err));
  }

  getCampaignData = () => {
    campaignData.getAllActiveCampaigns()
      .then((res) => this.setState({ campaigns: res.data }))
      .catch((err) => console.error(err));
  }

  levelUpdate = (e) => {
    e.preventDefault();
    this.setState({ level: e.target.value });
  }

  classUpdate = (e) => {
    e.preventDefault();
    this.setState({ characterClass: e.target.value });
  }

  speedUpdate = (e) => {
    e.preventDefault();
    this.setState({ speed: e.target.value });
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

  campaignUpdate = (e) => {
    e.preventDefault();
    this.setState({ campaignId: e.target.value });
  }

  componentDidMount() {
    this.getCampaignData();
    this.loadState();
  }

  createCharacter = (e) => {
    e.preventDefault();
    const {
      characterId,
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
      speed,
      level,
      characterClass,
      campaignId,
    } = this.state;
    const characterObj = {
      characterId,
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
      speed,
      level,
      characterClass,
      campaignId,
    };
    const jsonObj = JSON.stringify(characterObj);

    characterData.updatePC(characterId, jsonObj)
      .then(() => this.props.history.push('/characters'))
      .catch((err) => console.error(err));
  }

  render() {
    const {
      campaigns, name, AC,
      maxHP, initiativeBonus,
      strengthStat,
      dexterityStat,
      constitutionStat,
      intelligenceStat,
      wisdomStat,
      charismaStat,
      level,
      speed,
      characterClass,
      campaignId,
    } = this.state;
    return (
      <div className="container">
        <form>
          <div className="row">
            <div class="form-group col-4">
              <label >Player Character Names:</label>
              <input value={name} onChange={this.nameUpdate} type="text" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Max HP:</label>
              <input value={maxHP} onChange={this.healthUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Armor Class:</label>
              <input value={AC} onChange={this.acUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-4">
              <label >Initiative Bonus</label>
              <input value={initiativeBonus} onChange={this.initiativeUpdate} type="number" class="form-control" />
              <small class="form-text text-muted">Excluding DEX modifier, such as +5 from the Alert feat.</small>
            </div>
          </div>
          <div className="row">
          <div class="form-group col-2">
              <label >Strength Stat:</label>
              <input value={strengthStat} onChange={this.strStatUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Dexterity Stat:</label>
              <input value={dexterityStat} onChange={this.dexUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Consitution Stat:</label>
              <input value={constitutionStat} onChange={this.conUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Intelligence Stat:</label>
              <input value={intelligenceStat} onChange={this.intUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Wisdom Stat:</label>
              <input value={wisdomStat} onChange={this.wisUpdate} type="number" class="form-control" />
            </div>
            <div class="form-group col-2">
              <label >Charisma Stat:</label>
              <input value={charismaStat} onChange={this.chaUpdate} type="number" class="form-control" />
            </div>
          </div>
          <div className="row justify-content-center">
            <div class="form-group col-4">
              <label >Speed:</label>
              <input value={speed} onChange={this.speedUpdate} type="text" class="form-control" />
            </div>
            <div className='form-group col-4'>
                <label>Character Class:</label>
                <select className="form-control" value={characterClass} onChange={this.classUpdate}>
                    <option value={null} >Pick a Class</option>
                    <option>Barbarian</option>
                    <option>Bard</option>
                    <option>Cleric</option>
                    <option>Druid</option>
                    <option>Fighter</option>
                    <option>Monk</option>
                    <option>Paladin</option>
                    <option>Ranger</option>
                    <option>Rogue</option>
                    <option>Sorcerer</option>
                    <option>Warlock</option>
                    <option>Wizard</option>
                </select>
            </div>
            <div className='form-group col-4'>
                <label>Character Level:</label>
                <select className="form-control" value={level} onChange={this.levelUpdate}>
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
                </select>
            </div>
          </div>
          <div className="row justify-content-center">

            <div className='form-group col-4'>
                <label>Campaign:</label>
                <select className="form-control" value={campaignId} onChange={this.campaignUpdate}>
                    <option value={null} >Pick a Campaign</option>
                    {campaigns.map((campaign) => <option value={campaign.id}>{campaign.name}</option>)}
                </select>
            </div>

          </div>
          <button onClick={this.createCharacter} class="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UpdateCharacterForm;
