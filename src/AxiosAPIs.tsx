import axios from "axios";


axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_SERVER_TOKEN}`
export const getServerTokenApi = () => {
    axios.get('/api/api/get_token')
    .then((res) => {
    console.log('success get token')
    // import.meta.env.VITE_SERVER_TOKEN = res.data.token;
    })
    .catch((err) => console.log(err))
}

export const AuthTestApi = (data: Object) => {
    axios.post('/api/api/auth_test', data)
    .then(res => console.log('auth test', res.data))
    .catch(err => console.log(err))
}

export const BindAccountApi = (bindAccountData: Object) => {
    axios.post('/api/api/bind_account', bindAccountData)
    .then(res => console.log("bind account", res.data))
    .catch(err => console.log(err))
}

export const getTokenIdsApi = (getTokenIdsData: Object) => {
    axios.post('/api/api/get_tokenids', getTokenIdsData)
    .then(res => console.log("get tokenids", res.data))
    .catch(err => console.log(err))
}

export const getCouponsApi = (getCouponsData: Object) => {
    axios.post('/api/api/get_coupons', getCouponsData)
    .then(res => console.log("get coupons", res.data))
    .catch(err => console.log(err))
}

