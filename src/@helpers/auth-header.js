import { authenticationService } from '../@services/authentication.service';

export function authHeader() {
    // return authorization header with jwt token
    const token = authenticationService.currentUserValue;
    if (token) {
        return `Bearer ${token}`;
    } else {
        return {};
    }
}