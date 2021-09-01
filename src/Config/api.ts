import axios from 'axios';
import * as URL from './url';

export default function API(endpoint: string, method: any, body: any, token:string) {
    return axios({
        method: method,
        url: `${URL.API_NIKE}/${endpoint}`,
        data: body,
        headers: { "Authorization": `Bearer ${token}` }
    })
}