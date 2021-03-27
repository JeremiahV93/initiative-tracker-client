/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import apiData from './serverFiles';

const getAllPCs = () => axios.get(`${apiData.url}/players`, apiData.headers());

const getOnePC = (pcID) => axios.get(`${apiData.url}/players/${pcID}`, apiData.headers());

const updatePC = (pcId, pcObj) => axios.put(`${apiData.url}/players/${pcId}`, pcObj, apiData.createHeaders);

const deletePC = (pcId) => axios.delete(`${apiData.url}/players/${pcId}`, apiData.headers());

const createPC = (pcObj) => axios.post(`${apiData.url}/players`, pcObj, apiData.createHeaders);

export default {
  getAllPCs, updatePC, deletePC, createPC, getOnePC,
};
