import Cookies from 'js-cookie';

const getAccessToken = () => {
    return Cookies.get('accessToken');
}

const getRefreshToken =() =>{
    return Cookies.get('refreshToken')
}

export default {getAccessToken,getRefreshToken}