import axios from 'axios';
import { API_URL, EMAIL_KEY } from '@env';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    email_key: EMAIL_KEY.replace('@', '%40'),
  },
});

export default api;
