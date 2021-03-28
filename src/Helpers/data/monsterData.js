/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import apiData from './serverFiles';

const userId = localStorage.getItem('user_id');

const getMonsterTypes = () => axios.get(`${apiData.url}/monsters/monster_types/`, apiData.headers());

const getMonstersByType = (type) => axios.get(`${apiData.url}/monsters?monsterType=${type}/`, apiData.headers());

const getMonsterCRs = () => axios.get(`${apiData.url}/monsters/monster_CRs/`, apiData.headers());

const getMonstersByCr = (cr) => axios.get(`${apiData.url}/monsters?challengeRating=${cr}/`, apiData.headers());

const getMonstersByActiveUser = () => axios.get(`${apiData.url}/monsters?activeUser=${userId}/`, apiData.headers());

const getMonstersByName = (name) => axios.get(`${apiData.url}/monsters?name=${name}/`, apiData.headers());

const monsterPages = (pageNum) => axios.get(`${apiData.url}/monsters/monster_pages?pages=${pageNum}/`, apiData.headers());

const monsterPageUrl = (nextPrevUrl) => axios.get(`${nextPrevUrl}/`, apiData.headers());

const createMonster = (monsterObj) => axios.post(`${apiData.url}/monsters/`, monsterObj, apiData.createHeaders);

const getOneMonster = (monsterId) => axios.get(`${apiData.url}/monsters/${monsterId}/`, apiData.headers());

const updateMonster = (monsterId, monsterObj) => axios.put(`${apiData.url}/monsters/${monsterId}/`, monsterObj, apiData.createHeaders);

const deleteMonster = (monsterId) => axios.delete(`${apiData.url}/monsters/${monsterId}/`, apiData.headers());

const scrapData = () => axios.get(`${apiData.url}/scrap/`, apiData.headers());

export default {
  getMonsterCRs,
  getMonsterTypes,
  monsterPageUrl,
  monsterPages,
  createMonster,
  getOneMonster,
  updateMonster,
  deleteMonster,
  getMonstersByType,
  getMonstersByCr,
  getMonstersByActiveUser,
  getMonstersByName,
  scrapData,
};
