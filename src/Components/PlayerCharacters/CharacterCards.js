import React from 'react';
import {
  Card, CardBody, ButtonGroup,
  CardTitle, CardSubtitle, Button, Table,
} from 'reactstrap';

import './character.scss';

class CharacterCard extends React.Component {
  render() {
    const { character } = this.props;
    return (
      <div className='characterCard'>
      <Card >
        <CardBody>
          <CardTitle tag="h5">{character.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Max HP: {character.maxHP}  AC: {character.AC} </CardSubtitle>
          <Table>
            <thead>
              <tr>
                <th>STR</th>
                <th>DEX</th>
                <th>CON</th>
                <th>INT</th>
                <th>WIS</th>
                <th>CHA</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {character.strengthStat} ({ character.strength_mod >= 0 ? `+${character.strength_mod}` : `${character.strength_mod}` })</td>
                <td> {character.dexterityStat} ({ character.dexterity_mod >= 0 ? `+${character.dexterity_mod}` : `${character.dexterity_mod}` })</td>
                <td> {character.constitutionStat} ({ character.constitution_mod >= 0 ? `+${character.constitution_mod}` : `${character.constitution_mod}` })</td>
                <td> {character.intelligenceStat} ({ character.intelligence_mod >= 0 ? `+${character.intelligence_mod}` : `${character.intelligence_mod}` })</td>
                <td> {character.wisdomStat} ({character.wisdom_mod >= 0 ? `+${character.wisdom_mod}` : `${character.wisdom_mod}` })</td>
                <td> {character.charismaStat} ({ character.charisma_mod >= 0 ? `+${character.charisma_mod}` : `${character.charisma_mod}` })</td>

              </tr>
            </tbody>
          </Table>
          <ButtonGroup>
            <Button> Update</Button>
            <Button> Add to Encounter?</Button>
            <Button> delete</Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default CharacterCard;
