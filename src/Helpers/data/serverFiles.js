/* eslint-disable import/no-anonymous-default-export */
const url = 'https://initiative-tracker-server-6i8q6.ondigitalocean.app';
const monsterUrl = 'https://initiative-tracker-server-6i8q6.ondigitalocean.app/monsterPairs';
const playerUrl = 'https://initiative-tracker-server-6i8q6.ondigitalocean.app/playerPairs';

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

export default {
  url, headers, createHeaders, monsterUrl, playerUrl,
};
