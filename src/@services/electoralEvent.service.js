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

const activate = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/activate`, requestOptions).then(handleResponse);
}

const finish = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/finish`, requestOptions).then(handleResponse);
}

const createElectoralRegister = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/create-electoral-register`, requestOptions).then(handleResponse);
}

export const electoralEventService = {
  getAll,
  create,
  activate,
  finish,
  createElectoralRegister
}