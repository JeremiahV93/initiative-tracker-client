/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/encounterpairs';
const monsterUrl = 'http://127.0.0.1:8000/monsterPairs';
const playerUrl = 'http://127.0.0.1:8000/playerPairs';

const headers = () => (
  {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  }
);

const createHeaders = {
  headers: {
    Authorization: `Token ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
};

const createPair = (encounterObj) => axios.post(`${url}`, encounterObj, createHeaders);

const updateMonsterPair = (id, encounterObj) => axios.put(`${monsterUrl}/${id}`, encounterObj, createHeaders);
const updatePlayerPair = (id, encounterObj) => axios.put(`${playerUrl}/${id}`, encounterObj, createHeaders);

const getPairData = (encounterId) => axios.get(`${url}?encounterId=${encounterId}`, headers());

const deletePair = (obj) => axios.delete(`${url}/monster_delete`, obj, headers());

export default {
  createPair, updateMonsterPair, getPairData, deletePair, updatePlayerPair,
};
