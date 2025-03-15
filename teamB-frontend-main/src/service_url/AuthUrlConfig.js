import {HOST_URL} from "./AppUrlConfig";

const AUTH_SERVICE_URL = `${HOST_URL}/api/auth`

const LOGIN = `${AUTH_SERVICE_URL}/login`
const LOGOUT = `${AUTH_SERVICE_URL}/logout`


export default {AUTH_SERVICE_URL,LOGIN,LOGOUT}