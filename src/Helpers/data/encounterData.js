/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

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

const createEncounter = (encounterObj) => axios.post(`${url}encounters`, encounterObj, createHeaders);

const getAllActiveEncounters = () => axios.get(`${url}encounters?archive=False`, headers());

export default { createEncounter, getAllActiveEncounters };
