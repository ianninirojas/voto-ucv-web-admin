import { env } from "../@env";
import { authHeader, handleResponse } from '../@helpers';

const create = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/electoral-event`, requestOptions).then(handleResponse);
}

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event`, requestOptions).then(handleResponse);
}

const activate = () => {

}

const finish = () => {

}

export const electoralEventService = {
  getAll,
  create,
  activate,
  finish,
}