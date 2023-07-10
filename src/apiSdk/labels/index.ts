import axios from 'axios';
import queryString from 'query-string';
import { LabelInterface, LabelGetQueryInterface } from 'interfaces/label';
import { GetQueryInterface } from '../../interfaces';

export const getLabels = async (query?: LabelGetQueryInterface) => {
  const response = await axios.get(`/api/labels${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createLabel = async (label: LabelInterface) => {
  const response = await axios.post('/api/labels', label);
  return response.data;
};

export const updateLabelById = async (id: string, label: LabelInterface) => {
  const response = await axios.put(`/api/labels/${id}`, label);
  return response.data;
};

export const getLabelById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/labels/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLabelById = async (id: string) => {
  const response = await axios.delete(`/api/labels/${id}`);
  return response.data;
};
