import { env } from "../@env";
import { authHeader, handleResponse } from '../@helpers';

const getAll = () => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/type-election`, requestOptions).then(handleResponse);
}

const create = (data) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/type-election`, requestOptions).then(handleResponse);
}

const edit = (data) => {
  const requestOptions = {
    method: 'PUT',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/type-election/${data.id}`, requestOptions).then(handleResponse);
}

const erase = (data) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/type-election/${data.id}`, requestOptions).then(handleResponse);
}

export const typeElectionService = {
  getAll,
  create,
  edit,
  erase
}

