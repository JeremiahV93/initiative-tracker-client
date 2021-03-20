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

const updatePair = (id, encounterObj) => axios.put(`${url}/${id}`, createHeaders);

const getPairData = (encounterId) => axios.put(`${url}/${encounterId}`, headers());

const deletePair = (id) => axios.delete(`${url}/${id}`, headers());

export default {
  createPair, updatePair, getPairData, deletePair,
};
