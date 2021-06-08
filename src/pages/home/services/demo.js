import http from 'Utils/http';
import { API } from 'Constants/common';

export function getUser(id) {
    return http({
        url: `${API}/user/${id}`
    });
}