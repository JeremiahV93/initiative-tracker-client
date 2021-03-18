import React from 'react';
import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
import encounterData from '../../Helpers/data/encounterData';
import EncounterCard from './EncounterCard';

class Encounters extends React.Component {
  state = {
    encounters: [],
    isOpen: false,
    name: '',
    updating: false,
  }

  getEncounterData = () => {
    encounterData.getAllActiveEncounters()
      .then((res) => this.setState({ encounters: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getEncounterData();
  }

  EncounterUpdate = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  updateEncounter = (name, encounterId) => {
    this.setState({
      name, encounterId, isOpen: true, updating: true,
    });
  }

  submitEncounter = (e) => {
    e.preventDefault();
    const { name } = this.state;
    if (name === '') {
      this.setState({ isOpen: false });
      return;
    }
    const encounter = { name };
    const jsonObj = JSON.stringify(encounter);
    encounterData.createEncounter(jsonObj)
      .then(() => {
        this.getEncounterData();
        this.setState({ isOpen: false, name: '' });
      })
      .catch((err) => console.error(err));
  }

  deleteEncounter = (id) => {
    encounterData.deleteEncounter(id)
      .then(() => { this.getCatData(); })
      .catch((err) => console.error(err));
  }

  render() {
    const { isOpen, encounters } = this.state;
    const { history } = this.props;

    const toggle = () => this.setState({ isOpen: !isOpen });

    const buildEncounters = encounters.map((encounter) => <EncounterCard encounter={encounter} history={history}
     deleteEncounter={this.deleteEncounter} key={encounter.id} updateEncounter={this.updateEncounter} />);

    return (
      <div>
        <h1>Encounters</h1>
        <div>
          <Button onClick={toggle} className="btn btn-info">Create Encounter</Button>
          <Collapse isOpen={isOpen}>
          <Card>
                <CardBody>
                <form>
                    <div className="form-group">
                      <label htmlFor="EncounterName">Encounter Name:</label>
                      <input type="text" onChange={this.EncounterUpdate} className="form-control" aria-describedby="Encounterhelp" />
                    </div>
                    <button onClick={this.submitEncounter} className="btn btn-primary">Submit</button>
                  </form>
                </CardBody>
              </Card>
          </Collapse>

        </div>
        { buildEncounters }
      </div>
    );
  }
}

export default Encounters;
