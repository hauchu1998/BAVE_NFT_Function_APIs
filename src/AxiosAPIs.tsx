import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const getServerTokenApi = async () => {
    axios.get('/api/get_token')
    .then((res) => {
        console.log(res);
        localStorage.setItem('auth_token', res.data.token);
    })
    .catch((err) => console.log(err))
}

interface ApiData {
    address?: string,
    email?: string,
    token_ids?: number[]
}

export interface TokensInfo {
    tokenId: number,
    guppon?: string,
    take?: boolean,
    claimed?: boolean,
}

interface ResponseData {
    op_code: number,
    op_msg: string,
    results?: TokensInfo[] | undefined;
}

export const AuthTestApi = async (data: any) => {
    await axios.post('/api/auth_test', data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
    .then(res => console.log('auth test', res.data))
    .catch(err => console.log(err))
}

export const bindAccountApi = async (bindAccountData: ApiData) => {
    await axios.post('/api/bind_account', bindAccountData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
}

export const getTokenIdsApi = async (getTokenIdsData: ApiData) => {
    return await axios.post('/api/get_tokenids', getTokenIdsData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
}

export const getCouponsApi = async (getCouponsData: ApiData) => {
    return await axios.post('/api/get_coupons', getCouponsData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
}

