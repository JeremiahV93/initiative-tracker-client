/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/players';

const token = localStorage.getItem('token');

const headers = () => (
  {
    headers: {
      Authorization: `Token ${token}`,
    },
  }
);

const createHeaders = {
  headers: {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  },
};

const getAllPCs = () => axios.get(`${url}`, headers());

const getOnePC = (pcID) => axios.get(`${url}/${pcID}`, headers());

const updatePC = (pcId, pcObj) => axios.put(`${url}/${pcId}`, pcObj, createHeaders);

const deletePC = (pcId) => axios.delete(`${url}/${pcId}`, headers());

const createPC = (pcObj) => axios.post(`${url}`, pcObj, createHeaders);

export default {
  getAllPCs, updatePC, deletePC, createPC, getOnePC,
};
