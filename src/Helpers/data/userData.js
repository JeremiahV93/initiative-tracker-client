/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

const authUser = (authCredentials) => axios.post(`${url}login`, authCredentials);

const newUser = (newUserObj) => axios.post(`${url}register`, newUserObj);

export default { authUser, newUser };
