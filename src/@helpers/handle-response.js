import { authenticationService } from '../@services/authentication.service';

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401].indexOf(response.status) !== -1) {
                authenticationService.logout();
            }
            else if ([403].indexOf(response.status) !== -1) {
                window.location.href('/')
                window.location.reload(true);
            }
            const error = (data && data.data) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}