/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'https://initiative-tracker-server-6i8q6.ondigitalocean.app/';

const createHeaders = {
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
};

const authUser = (authCredentials) => axios.post(`${url}login`, authCredentials, createHeaders);

const newUser = (newUserObj) => axios.post(`${url}register`, newUserObj);

export default { authUser, newUser };
