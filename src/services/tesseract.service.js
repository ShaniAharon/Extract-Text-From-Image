// import {axios} from '../lib/axios';

import api from './api.js';

const base_url = '/api/test';

export const tesseractService = {
  getEmptyFormData,
  save,
};

function save(formData) {
  return api()
    .post(base_url, formData)
    .then((res) => res.data);
}

function getEmptyFormData() {
  return {
    name: '',
    price: '',
  };
}
