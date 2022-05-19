// import {axios} from '../lib/axios';

import api from '../services/api.js';

const base_url = '/api/google';

export const googleService = {
  getEmptyFormData,
  save,
};

function save(formData) {
  return api()
    .post(base_url, formData)
    .then(() => console.log('added data'));
}

function getEmptyFormData() {
  return {
    name: '',
    price: '',
  };
}
