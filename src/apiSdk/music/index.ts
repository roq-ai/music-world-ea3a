import axios from 'axios';
import queryString from 'query-string';
import { MusicInterface, MusicGetQueryInterface } from 'interfaces/music';
import { GetQueryInterface } from '../../interfaces';

export const getMusic = async (query?: MusicGetQueryInterface) => {
  const response = await axios.get(`/api/music${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMusic = async (music: MusicInterface) => {
  const response = await axios.post('/api/music', music);
  return response.data;
};

export const updateMusicById = async (id: string, music: MusicInterface) => {
  const response = await axios.put(`/api/music/${id}`, music);
  return response.data;
};

export const getMusicById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/music/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMusicById = async (id: string) => {
  const response = await axios.delete(`/api/music/${id}`);
  return response.data;
};
