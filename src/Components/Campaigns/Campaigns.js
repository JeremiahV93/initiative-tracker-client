import React from 'react';
import {
  Collapse, Button, CardBody, Card,
} from 'reactstrap';
import campaignData from '../../Helpers/data/campaignData';
import CampaignCard from './CampaignCards';

class Campaigns extends React.Component {
  state = {
    campaigns: [],
    isOpen: false,
    name: '',
    updating: false,
  }

  getCampaignData = () => {
    campaignData.getAllActiveCampaigns()
      .then((res) => this.setState({ campaigns: res.data }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getCampaignData();
  }

  CampaignUpdate = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.value });
  }

  updateCampaign = (name, campaignId) => {
    this.setState({
      name, campaignId, isOpen: true, updating: true,
    });
  }

  submitCampaign = (e) => {
    e.preventDefault();
    const { name, updating, campaignId } = this.state;
    if (name === '') {
      this.setState({ isOpen: false });
      return;
    }
    const encounter = { name };
    const jsonObj = JSON.stringify(encounter);

    if (updating) {
      campaignData.updateCampaign(campaignId, jsonObj)
        .then(() => {
          this.getCampaignData();
          this.setState({ isOpen: false, name: '', updating: false });
        })
        .catch((err) => console.error(err));
    } else {
      campaignData.createCampaign(jsonObj)
        .then(() => {
          this.getCampaignData();
          this.setState({ isOpen: false, name: '' });
        })
        .catch((err) => console.error(err));
    }
  }

  deleteCampaign = (id) => {
    campaignData.deleteCampaign(id)
      .then(() => { this.getCampaignData(); })
      .catch((err) => console.error(err));
  }

  render() {
    const { isOpen, campaigns, name } = this.state;
    const { history } = this.props;

    const toggle = () => this.setState({ isOpen: !isOpen });

    const buildCampaigns = campaigns.map((campaign) => <CampaignCard campaign={campaign} history={history}
     deleteCampaign={this.deleteCampaign} key={campaign.id} updateCampaign={this.updateCampaign} />);

    return (
      <div>
        <h1>Campaigns</h1>
        <div>
          <Button onClick={toggle} className="btn btn-info">Create Campaign</Button>
          <Collapse isOpen={isOpen}>
          <Card>
                <CardBody>
                <form>
                    <div className="form-group">
                      <label htmlFor="CampaignName">Campaign Name:</label>
                      <input type="text" value={name} onChange={this.CampaignUpdate} className="form-control" aria-describedby="Campaignhelp" />
                    </div>
                    <button onClick={this.submitCampaign} className="btn btn-primary">Submit</button>
                  </form>
                </CardBody>
              </Card>
          </Collapse>

        </div>
        { buildCampaigns }
      </div>
    );
  }
}

export default Campaigns;
