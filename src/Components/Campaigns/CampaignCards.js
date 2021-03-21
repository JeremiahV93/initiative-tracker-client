import React from 'react';
import {
  Card, CardBody, CardTitle, Button, ButtonGroup,
} from 'reactstrap';

class CampaignCard extends React.Component {
  render() {
    const { campaign, deleteCampaign, updateCampaign } = this.props;

    const updateTrigger = (e) => {
      e.preventDefault();
      updateCampaign(campaign.name, campaign.id);
    };

    const deleteTrigger = (e) => {
      e.preventDefault();
      deleteCampaign(campaign.id);
    };

    // Need to create new privateRoute component for just printing campaign encounters
    // const link = (e) => {
    //   e.preventDefault();
    //   this.props.history.push({ pathname: '/encounters', state: { campaignId: campaign.id } });
    // };

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">{campaign.name}</CardTitle>
            <ButtonGroup>
              {/* <Button color="success" onClick={link}>See Encounters</Button> */}
              <Button color="warning" onClick={updateTrigger}>Update</Button>
              <Button color="danger" onClick={deleteTrigger}>Delete</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
    </div>
    );
  }
}

export default CampaignCard;
