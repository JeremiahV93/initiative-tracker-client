/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/encounterpairs';

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

const updatePair = (encounterObj) => axios.put(`${url}/1`, encounterObj, createHeaders);

const getPairData = (encounterId) => axios.get(`${url}?encounterId=${encounterId}`, headers());

const deletePair = (obj) => axios.delete(`${url}/monster_delete`, obj, headers());

export default {
  createPair, updatePair, getPairData, deletePair,
};
