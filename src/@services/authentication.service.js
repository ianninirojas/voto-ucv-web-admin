import { BehaviorSubject } from 'rxjs';

import * as jwt from "jsonwebtoken";

import { env } from "../@env";
import { handleResponse } from '../@helpers';
import { pathRoutes } from '../@constans';

const currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));

const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${env.apiUrl}/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            localStorage.setItem('currentUser', response.data);
            currentUserSubject.next(response.data);
            return;
        });
}

const refreshToken = (token) => {
    localStorage.setItem('currentUser', token);
}

const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    window.location.reload(true);
}

const getRole = () => {
    return jwt.decode(currentUserSubject.value).role;
}

const getUsername = () => {
    return jwt.decode(currentUserSubject.value).username;
}

const getId = () => {
    return jwt.decode(currentUserSubject.value).userId;
}

const updateProfile = (history) => {
    const user = {
        username: getUsername(),
        role: getRole(),
        id: getId(),
    }
    history.push({
        pathname: pathRoutes.USERSEDIT.replace(':id', getId()),
        state: { user }
    })
}

export const authenticationService = {
    login,
    logout,
    getRole,
    getUsername,
    getId,
    updateProfile,
    refreshToken,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};