import React from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup,
} from 'reactstrap';

class EncounterCard extends React.Component {
  render() {
    const { encounter, deleteEncounter, updateEncounter } = this.props;

    const updateTrigger = (e) => {
      e.preventDefault();
      updateEncounter(encounter.name, encounter.id);
    };

    const deleteTrigger = (e) => {
      e.preventDefault();
      deleteEncounter(encounter.id);
    };

    const goToEncounterRoom = () => {
      this.props.history.push(`./encounter-room/${encounter.id}`);
    };

    return (
      <div>
        <Card className="encounterCard">
          <CardBody>
            <CardTitle tag="h5">{encounter.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Roomcode: {encounter.roomcode}</CardSubtitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Campaign: {encounter.campaign.name}</CardSubtitle>

            <ButtonGroup>
              <Button color="success" onClick={goToEncounterRoom}>View</Button>
              <Button color="warning" onClick={updateTrigger}>Update</Button>
              <Button color="danger" onClick={deleteTrigger}>Delete</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
    </div>
    );
  }
}

export default EncounterCard;
