import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

// console.log(API.defaults.baseURL, 'baseURLwededwedf');

export const fetchLogs = async (params) => {
    // console.log('Calling /logs', params);
    try {
        const response = await API.get('/logs', { params });
        // console.log('logs==>', response.data);
        return response;
      } catch (error) {
        console.error('Error logs', error);
        throw error;
      }  };
  
  export const fetchStats = async (params) => {
    // console.log('Calling /logs/stats', params);
    try {
      const response = await API.get('/logs/stats', { params });
      // console.log('Stats==>', response.data); 
      return response;
    } catch (error) {
      console.error('Error stats', error);
      throw error;
    }
  };
  
  