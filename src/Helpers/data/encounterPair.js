/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import apiData from './serverFiles';

const createPair = (encounterObj) => axios.post(`${apiData.url}/encounterpairs/`, encounterObj, apiData.createHeaders);

const updateMonsterPair = (id, encounterObj) => axios.put(`${apiData.monsterUrl}/${id}/`, encounterObj, apiData.createHeaders);
const updatePlayerPair = (id, encounterObj) => axios.put(`${apiData.playerUrl}/${id}/`, encounterObj, apiData.createHeaders);

const deleteMonsterPair = (id) => axios.delete(`${apiData.monsterUrl}/${id}/`, apiData.headers());
const deletePlayerPair = (id) => axios.delete(`${apiData.playerUrl}/${id}/`, apiData.headers());

const getPairData = (encounterId) => axios.get(`${apiData.url}/encounterpairs?encounterId=${encounterId}/`, apiData.headers());

export default {
  createPair, updateMonsterPair, getPairData, updatePlayerPair, deleteMonsterPair, deletePlayerPair,
};
