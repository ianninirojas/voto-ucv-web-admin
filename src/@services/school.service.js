import { env } from "../@env";
import { authHeader, handleResponse } from '../@helpers';

const getAll = (facultyId) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/faculty/${facultyId}/school`, requestOptions).then(handleResponse);
}

const create = (facultyId, data) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/faculty/${facultyId}/school`, requestOptions).then(handleResponse);
}

const edit = (school) => {
  const requestOptions = {
    method: 'PUT',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(school)
  };
  return fetch(`${env.apiUrl}/faculty/${school.facultyId}/school/${school.id}`, requestOptions).then(handleResponse);
}

const erase = (school) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/faculty/${school.facultyId}/school/${school.id}`, requestOptions).then(handleResponse);
}

export const schoolService = {
  getAll,
  create,
  edit,
  erase
}

