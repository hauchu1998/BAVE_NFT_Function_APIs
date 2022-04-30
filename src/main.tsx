import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { getTokenIdsApi, getServerTokenApi ,BindAccountApi, getCouponsApi, AuthTestApi} from './AxiosAPIs'

// fetch('http://139.162.104.51/api/get_token', {
//   method:'GET',
//   mode:'cors'
// })
// .then((res) => {
//   console.log(res);
//   })
//   .catch((err) => console.log(err))

// getServerTokenApi();

// var data = {
//   'post_vale': 'test'
// }
// AuthTestApi(data);



// var bindAccountData = {
//   "address": "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b90",
//   "email": "aaaaaaaaaaaaaaaaa@gmail.com"
// }
// BindAccountApi(bindAccountData)

// var getTokenIdsData = {
//   "address": "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b90",
// }
// getTokenIdsApi(getTokenIdsData);

// var getCouponsData = {
//   "address": "0xf16e9b0d03470827a95cdfd0cb8a8a3b46969b90",
//   "token_ids": [1,2,3,4]
// }
// getCouponsApi(getCouponsData);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
