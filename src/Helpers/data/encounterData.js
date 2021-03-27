/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import apiData from './serverFiles';

const createEncounter = (encounterObj) => axios.post(`${apiData.url}/encounters`, encounterObj, apiData.createHeaders);

const updateEncounter = (id, encounterObj) => axios.put(`${apiData.url}/encounters/${id}`, encounterObj, apiData.createHeaders);

const deleteEncounter = (id) => axios.delete(`${apiData.url}/encounters/${id}`, apiData.headers());

const getAllActiveEncounters = () => axios.get(`${apiData.url}/encounters?archive=False`, apiData.headers());

const getOneEncounter = (id) => axios.get(`${apiData.url}/encounters/${id}`, apiData.headers());

const getEncountersOnCampaignID = (encounterId) => axios.get(`${apiData.url}/encounters/${encounterId}`, apiData.headers());

export default {
  createEncounter, getAllActiveEncounters, updateEncounter, deleteEncounter, getEncountersOnCampaignID, getOneEncounter,
};
