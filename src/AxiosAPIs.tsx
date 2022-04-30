import axios from "axios";



export const getServerTokenApi = () => {
    axios.get('/api/api/get_token')
    .then((res) => {
    import.meta.env.VITE_SERVER_TOKEN = res.data.token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_SERVER_TOKEN}`;
    })
    .catch((err) => console.log(err))
}

interface ApiData {
    address?: string,
    email?: string,
    token_ids?: number[]
}

export const AuthTestApi = (data: any) => {
    axios.post('/api/api/auth_test', data)
    .then(res => console.log('auth test', res.data))
    .catch(err => console.log(err))
}

export const BindAccountApi = (bindAccountData: ApiData) => {
    axios.post('/api/api/bind_account', bindAccountData)
    .then(res => console.log("bind account", res.data))
    .catch(err => console.log(err))
}

export const getTokenIdsApi = (getTokenIdsData: ApiData) => {
    axios.post('/api/api/get_tokenids', getTokenIdsData)
    .then(res => console.log("get tokenids", res.data))
    .catch(err => console.log(err))
}

export const getCouponsApi = (getCouponsData: ApiData) => {
    axios.post('/api/api/get_coupons', getCouponsData)
    .then(res => console.log("get coupons", res.data))
    .catch(err => console.log(err))
}

