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

    return (
      <div>
        <Card className="campaignCard">
          <CardBody>
            <CardTitle className='campaignName' tag="h3">{campaign.name}</CardTitle>
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
