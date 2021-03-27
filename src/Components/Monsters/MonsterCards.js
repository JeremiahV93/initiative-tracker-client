import React from 'react';
import {
  Card, CardBody, Button,
  CardTitle, CardSubtitle, Table,
} from 'reactstrap';

import './monster.scss';

class MonsterCard extends React.Component {
  render() {
    const { monster, openModal } = this.props;

    const modalButton = (e) => {
      e.preventDefault();
      openModal(monster.id, monster.campaign);
    };
    return (
      <div className='monsterCard'>
      <Card >
        <CardBody>
          <CardTitle className="monsterName" tag="h5">{monster.name}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Type: {monster.monsterType} Challenge Rating: {monster.challengeRating} </CardSubtitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Size: {monster.size}  AC: {monster.AC} Max HP: {monster.maxHP}  </CardSubtitle>

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
                <td> {monster.strengthStat} ({ monster.strength_mod >= 0 ? `+${monster.strength_mod}` : `${monster.strength_mod}` })</td>
                <td> {monster.dexterityStat} ({ monster.dexterity_mod >= 0 ? `+${monster.dexterity_mod}` : `${monster.dexterity_mod}` })</td>
                <td> {monster.constitutionStat} ({ monster.constitution_mod >= 0 ? `+${monster.constitution_mod}` : `${monster.constitution_mod}` })</td>
                <td> {monster.intelligenceStat} ({ monster.intelligence_mod >= 0 ? `+${monster.intelligence_mod}` : `${monster.intelligence_mod}` })</td>
                <td> {monster.wisdomStat} ({monster.wisdom_mod >= 0 ? `+${monster.wisdom_mod}` : `${monster.wisdom_mod}` })</td>
                <td> {monster.charismaStat} ({ monster.charisma_mod >= 0 ? `+${monster.charisma_mod}` : `${monster.charisma_mod}` })</td>

              </tr>
            </tbody>
          </Table>
          <Button onClick={modalButton}> Add To An Encounter </Button>
        </CardBody>
      </Card>
      </div>
    );
  }
}

export default MonsterCard;
