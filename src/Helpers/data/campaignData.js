/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

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

const createCampaign = (campaignObj) => axios.post(`${url}campaigns`, campaignObj, createHeaders);

const updateCampaign = (id, campaignObj) => axios.put(`${url}campaigns/${id}`, campaignObj, createHeaders);

const deleteCampaign = (id) => axios.delete(`${url}campaigns/${id}`, headers());

const getAllActiveCampaigns = () => axios.get(`${url}campaigns?archive=False`, headers());

export default {
  createCampaign, updateCampaign, deleteCampaign, getAllActiveCampaigns,
};
