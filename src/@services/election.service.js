import { env } from "../@env";
import { authHeader, handleResponse } from '../@helpers';

const getAll = (electoralEventPublickey) => {
  const requestOptions = {
    method: 'GET',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/election`, requestOptions).then(handleResponse);
}

const create = (electoralEventPublickey, data) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/election`, requestOptions).then(handleResponse);
}

const associateCandidates = (electoralEventPublickey, data) => {
  const requestOptions = {
    method: 'POST',
    headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };
  return fetch(`${env.apiUrl}/electoral-event/${electoralEventPublickey}/election/${data.election.id}`, requestOptions).then(handleResponse);
}

export const electionService = {
  getAll,
  create,
  associateCandidates
}

