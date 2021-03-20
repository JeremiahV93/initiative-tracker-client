import React from 'react';
import monsterData from '../../Helpers/data/monsterData';

import MonsterCard from './MonsterCards';
import './monster.scss';

class Monsters extends React.Component {
  state = {
    monsters: [],
    nextUrl: '',
    prevUrl: '',
    challengeRatings: [],
    crSearch: '',
    monsterTypes: [],
    typeSearch: '',
    nameSearch: '',
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
  }

  render() {
    const {
      monsterTypes, challengeRatings, monsters, nextUrl, prevUrl,
    } = this.state;

    const buildCards = monsters.map((monster) => <MonsterCard monster={monster} key={monster.id}
     />);

    return (
      <div>
        <h1>Monsters</h1>
        <form>
          <div class="form-group col-6">
            <label for="monsterName">Search for Monster by Name:</label>
            <input type="text" onChange={this.updateNameSearch} class="form-control" id="monsterName" aria-describedby="monsterName" placeholder="Monster Name"/>
            <button type="submit" onClick={this.searchByName} class="btn btn-primary">Search</button>
          </div>
          <div className="form-group col-4">
            <label for="monsterTypeSearch">Search by Type:</label>
            <select className="form-control" id="monsterTypeSearch" onChange={this.updateTypeSearch}>
            <option value={null} >Pick a Type</option>
              { monsterTypes.map((type) => <option value={type.monsterType}>{type.monsterType}</option>)}
            </select>
            <button type="submit" onClick={this.searchByType} class="btn btn-primary">Search</button>
          </div>
          <div className="form-group col-4">
            <label for="monsterCRSearch">Search by CR:</label>
            <select className="form-control" id="monsterCRSearch" onChange={this.updateCrSearch}>
            <option value={null} >Pick a CR</option>
              { challengeRatings.map((cr) => <option value={cr.challengeRating}>{cr.challengeRating}</option>)}
            </select>
            <button type="submit" onClick={this.searchByCR} class="btn btn-primary">Search</button>
          </div>
          <button type="submit" onClick={this.getActiveUserMonsters} class="btn btn-primary">My Monsters</button>
          <button type="submit" onClick={this.resetMonsterPage} class="btn btn-primary">All Monsters</button>
          <button onClick={this.goToMonsterForm} className='btn btn-primary'> Create Monster</button>

        </form>
        <div className='monsterContainer container'>
          {buildCards}
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center pagination-lg">
          <button value={prevUrl} onClick={this.previousPage} class="btn btn-primary">Prev</button>
          <button value={nextUrl} onClick={this.nextPage} class="btn btn-primary">Next</button>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Monsters;
