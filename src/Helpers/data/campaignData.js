/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import apiData from './serverFiles';

const createCampaign = (campaignObj) => axios.post(`${apiData.url}/campaigns/`, campaignObj, apiData.createHeaders);

const updateCampaign = (id, campaignObj) => axios.put(`${apiData.url}/campaigns/${id}/`, campaignObj, apiData.createHeaders);

const deleteCampaign = (id) => axios.delete(`${apiData.url}/campaigns/${id}/`, apiData.headers());

const getAllActiveCampaigns = () => axios.get(`${apiData.url}/campaigns?archive=False/`, apiData.headers());

export default {
  createCampaign, updateCampaign, deleteCampaign, getAllActiveCampaigns,
};
