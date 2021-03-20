/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/monsters';

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

const userId = localStorage.getItem('user_id');

const getMonsterTypes = () => axios.get(`${url}/monster_types`, headers());

const getMonstersByType = (type) => axios.get(`${url}?monsterType=${type}`, headers());

const getMonsterCRs = () => axios.get(`${url}/monster_CRs`, headers());

const getMonstersByCr = (cr) => axios.get(`${url}?challengeRating=${cr}`, headers());

const getMonstersByActiveUser = () => axios.get(`${url}?activeUser=${userId}`, headers());

const getMonstersByName = (name) => axios.get(`${url}?name=${name}`, headers());

const monsterPages = (pageNum) => axios.get(`${url}/monster_pages?pages=${pageNum}`, headers());

const monsterPageUrl = (nextPrevUrl) => axios.get(`${nextPrevUrl}`, headers());

const createMonster = (monsterObj) => axios.post(`${url}`, monsterObj, createHeaders);

const getOneMonster = (monsterId) => axios.get(`${url}/${monsterId}`, headers());

const updateMonster = (monsterId, monsterObj) => axios.put(`${url}/${monsterId}`, monsterObj, createHeaders);

const deleteMonster = (monsterId) => axios.delete(`${url}/${monsterId}`, headers());

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
};
