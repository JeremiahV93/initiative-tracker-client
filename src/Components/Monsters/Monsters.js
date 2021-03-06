import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup,
} from 'reactstrap';
import monsterData from '../../Helpers/data/monsterData';
import encounterData from '../../Helpers/data/encounterData';
import pairData from '../../Helpers/data/encounterPair';
import MonsterCard from './MonsterCards';
import './monster.scss';

class Monsters extends React.Component {
  state = {
    encounters: [],
    monsterId: null,
    encounterId: null,
    monsters: [],
    nextUrl: '',
    prevUrl: '',
    challengeRatings: [],
    crSearch: '',
    monsterTypes: [],
    typeSearch: '',
    nameSearch: '',
    modal: false,
  }

  getEncountersForModal = () => {
    encounterData.getAllActiveEncounters()
      .then((res) => this.setState({ encounters: res.data }))
      .catch((err) => console.error(err));
  }

  getInitialMonsterData = () => {
    monsterData.monsterPages(1)
      .then((res) => {
        this.setState({ monsters: res.data.results, nextUrl: res.data.next });
      })
      .catch((err) => console.error(err));
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

  updateCrSearch = (e) => {
    e.preventDefault();
    this.setState({ crSearch: e.target.value });
  }

  updateNameSearch = (e) => {
    e.preventDefault();
    this.setState({ nameSearch: e.target.value });
  }

  updateTypeSearch = (e) => {
    e.preventDefault();
    this.setState({ typeSearch: e.target.value });
  }

  searchByCR = (e) => {
    e.preventDefault();
    const { crSearch } = this.state;
    monsterData.getMonstersByCr(crSearch)
      .then((res) => this.setState({ monsters: res.data, crSearch: null }))
      .catch((err) => console.error(err));
  }

  searchByName = (e) => {
    e.preventDefault();
    const { nameSearch } = this.state;
    monsterData.getMonstersByName(nameSearch)
      .then((res) => this.setState({ monsters: res.data, nameSearch: '' }));
  }

  searchByType = (e) => {
    e.preventDefault();
    const { typeSearch } = this.state;
    monsterData.getMonstersByType(typeSearch)
      .then((res) => this.setState({ monsters: res.data, typeSearch: '' }));
  }

  resetMonsterPage = (e) => {
    e.preventDefault();
    this.getInitialMonsterData();
  }

  getActiveUserMonsters = (e) => {
    e.preventDefault();
    monsterData.getMonstersByActiveUser()
      .then((res) => this.setState({ monsters: res.data }));
  }

  previousPage = (e) => {
    e.preventDefault();
    const { prevUrl } = this.state;
    if (prevUrl !== '') {
      monsterData.monsterPageUrl(prevUrl)
        .then((res) => {
          this.setState({ monsters: res.data.results, nextUrl: res.data.next, prevUrl: res.data.previous });
          window.scroll(0, 0);
        });
    }
  }

  nextPage = (e) => {
    e.preventDefault();
    const { nextUrl } = this.state;
    if (nextUrl !== '') {
      monsterData.monsterPageUrl(nextUrl)
        .then((res) => {
          this.setState({ monsters: res.data.results, nextUrl: res.data.next, prevUrl: res.data.previous });
          window.scroll(0, 0);
        });
    }
  }

  goToMonsterForm = (e) => {
    e.preventDefault();
    this.props.history.push('/monster-form');
  }

  componentDidMount() {
    this.getInitialMonsterData();
    this.getMonsterTypes();
    this.getMonsterchallengeRatings();
    this.getEncountersForModal();
  }

  updateEncounterId = (e) => {
    e.preventDefault();
    this.setState({ encounterId: e.target.value });
  }

  createEncounterPair = (e) => {
    e.preventDefault();
    const { encounterId, monsterId } = this.state;
    const pairObj = { encounterId, monsterId, characterId: '' };
    const jsonObj = JSON.stringify(pairObj);
    pairData.createPair(jsonObj)
      .then((res) => {
        this.setState({
          encounterId: null, monsterId: null, modal: false,
        });
      })
      .catch((err) => console.error(err));
  }

  scrapButton = (e) => {
    e.preventDefault();
    monsterData.scrapData
      .then((res) => {
        this.getInitialMonsterData();
        this.getMonsterTypes();
        this.getMonsterchallengeRatings();
        this.getEncountersForModal();
      })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      monsterTypes, challengeRatings, monsters, nextUrl, prevUrl, encounters, modal,
    } = this.state;
    const { className } = this.props;
    const toggle = () => this.setState({ modal: !modal });

    const openModal = (monsterId) => {
      this.getEncountersForModal();
      this.setState({ monsterId });
      toggle();
    };

    const buildCards = monsters.map((monster) => <MonsterCard monster={monster} openModal={openModal} key={monster.id}
     />);

    return (
      <div>
        <h1>Monsters</h1>
        <div className="container">
        <form className="FormContainer">
          <div class="form-group col-6 offset-lg-3">
            <label for="monsterName">Search for Monster by Name:</label>
            <input type="text" onChange={this.updateNameSearch} class="form-control nameClass" id="monsterName" aria-describedby="monsterName" placeholder="Monster Name"/>
            <button type="submit" onClick={this.searchByName} class="btn btn-primary">Search</button>
          </div>
          <div className="form-group col-4 offset-lg-4">
            <label for="monsterTypeSearch">Search by Type:</label>
            <select className="form-control" id="monsterTypeSearch" onChange={this.updateTypeSearch}>
            <option value={null} >Pick a Type</option>
            <option >undead</option>
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
            <button type="submit" onClick={this.searchByType} class="btn btn-primary">Search</button>
          </div>
          <div className="form-group col-4 offset-lg-4">
            <label for="monsterCRSearch">Search by CR:</label>
            <select className="form-control" id="monsterCRSearch" onChange={this.updateCrSearch}>
            <option value={null} >Pick a CR</option>
              { challengeRatings.map((cr) => <option value={cr.challengeRating}>{cr.challengeRating}</option>)}
            </select>
            <button type="submit" onClick={this.searchByCR} class="btn btn-primary">Search</button>
          </div>
          <div >
            <button type="submit" onClick={this.getActiveUserMonsters} class=" buttonGroup btn btn-primary">My Monsters</button>
            <button type="submit" onClick={this.resetMonsterPage} class=" buttonGroup btn btn-primary">All Monsters</button>
            <button onClick={this.goToMonsterForm} className='buttonGroup btn btn-primary'> Create Monster</button>
            {/* <button onClick={this.scrapButton} className='buttonGroup btn btn-primary'> Scrap monsters</button> */}

          </div>
        </form>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center pagination-lg">
          <button value={prevUrl} onClick={this.previousPage} class="btn btn-primary">Prev</button>
          <button value={nextUrl} onClick={this.nextPage} class="btn buttonGroup btn-primary">Next</button>
          </ul>
        </nav>

        <div className='monsterContainer container'>
          {buildCards}
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center pagination-lg">
          <button value={prevUrl} onClick={this.previousPage} class="btn btn-primary">Prev</button>
          <button value={nextUrl} onClick={this.nextPage} class=" buttonGroup btn btn-primary">Next</button>
          </ul>
        </nav>

        <div>
              <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Assign Monster to an Encounter</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label> Add Monster to an Encounter </Label>
                        <Input onChange={this.updateEncounterId} type="select" >
                          <options>Encounter options</options>
                          {encounters.map((encounter) => <option value={encounter.id} >{encounter.name}</option>)}
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

export default Monsters;
