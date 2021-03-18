import React from 'react';
import {
  Card, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup,
} from 'reactstrap';

class EncounterCard extends React.Component {
  render() {
    const { encounter } = this.props;
    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle tag="h5">{encounter.name}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">Roomcode: {encounter.roomcode}</CardSubtitle>
            <ButtonGroup>
              <Button>View</Button>
              <Button>Update</Button>
              <Button>Delete</Button>
            </ButtonGroup>
          </CardBody>
        </Card>
    </div>
    );
  }
}

export default EncounterCard;
