import React from 'react';
import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
import encounterData from '../../Helpers/data/encounterData';
import campaignData from '../../Helpers/data/campaignData';
import EncounterCard from './EncounterCard';

class Encounters extends React.Component {
  state = {
    encounters: [],
    campaigns: [],
    isOpen: false,
    name: '',
    updating: false,
    campaignId: null,
  }

  getEncounterData = () => {
    encounterData.getAllActiveEncounters()
      .then((res) => this.setState({ encounters: res.data }))
      .catch((err) => console.error(err));
  }

  getCampaignData = () => {
    campaignData.getAllActiveCampaigns()
      .then((res) => this.setState({ campaigns: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getEncounterData();
    this.getCampaignData();
    if (this.props.location.state === null) {
      console.error('whoops');
    } else {
      encounterData.getEncountersOnCampaignID(this.props.location.state.campaignId)
        .then((res) => this.setState({ encounters: res.data }))
        .catch((err) => console.error(err));
    }
  }

  EncounterUpdate = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  updateCampaignId = (e) => {
    e.preventDefault();
    this.setState({ campaignId: e.target.value });
  }

  updateEncounter = (name, encounterId) => {
    this.setState({
      name, encounterId, isOpen: true, updating: true,
    });
  }

  submitEncounter = (e) => {
    e.preventDefault();
    const {
      name, updating, encounterId, campaignId,
    } = this.state;
    if (name === '' || campaignId === null) {
      this.setState({ isOpen: false });
      return;
    }
    const encounter = { name, campaignId };
    const jsonObj = JSON.stringify(encounter);

    if (updating) {
      encounterData.updateEncounter(encounterId, jsonObj)
        .then(() => {
          this.getEncounterData();
          this.setState({ isOpen: false, name: '', updating: false });
        })
        .catch((err) => console.error(err));
    } else {
      encounterData.createEncounter(jsonObj)
        .then(() => {
          this.getEncounterData();
          this.setState({ isOpen: false, name: '' });
        })
        .catch((err) => console.error(err));
    }
  }

  deleteEncounter = (id) => {
    encounterData.deleteEncounter(id)
      .then(() => { this.getEncounterData(); })
      .catch((err) => console.error(err));
  }

  render() {
    const {
      isOpen, encounters, campaigns, name,
    } = this.state;
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
                      <input type="text" value={name} onChange={this.EncounterUpdate} className="form-control" aria-describedby="Encounterhelp" />
                    </div>
                    <div className="form-group">
                      <label for="encounterCampaign">Select Campaign</label>
                      <select className="form-control" id="campaignId" onChange={this.updateCampaignId}>
                        <option value={null} >Pick a Campaign</option>
                        { campaigns.map((campaign) => <option value={campaign.id}>{campaign.name}</option>)}
                      </select>
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
