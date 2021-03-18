import React from 'react';
import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
import encounterData from '../../Helpers/data/encounterData';

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

  render() {
    const { isOpen } = this.state;

    const toggle = () => this.setState({ isOpen: !isOpen });

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
      </div>
    );
  }
}

export default Encounters;
