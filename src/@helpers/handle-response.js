import { authenticationService } from '../@services/authentication.service';

export function handleResponse(response) {
    return response.text().then(text => {
        if (response.headers.has('token')) {
            authenticationService.refreshToken(response.headers.get('token'))
        }
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                authenticationService.logout();
            }
            const error = (data && data.data) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}