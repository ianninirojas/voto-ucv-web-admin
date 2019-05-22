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
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/electoral-register`, requestOptions).then(handleResponse);
}

const totalize = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/totalize`, requestOptions).then(handleResponse);
}

const getElectoralRegister = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/electoral-register`, requestOptions).then(handleResponse);
}

const getElector = (electoralEventPublickey, electorId) => {
  const requestOptions = {
    method: 'GET',    
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/electoral-register/${electorId}`, requestOptions).then(handleResponse);
}

const updateElector = (electoralEventPublickey, electorId, data) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/electoral-register/${electorId}`, requestOptions).then(handleResponse);
}

export const electoralEventService = {
  getAll,
  create,
  finish,
  activate,
  totalize,
  getElector,
  updateElector,
  getElectoralRegister,
  createElectoralRegister,
}