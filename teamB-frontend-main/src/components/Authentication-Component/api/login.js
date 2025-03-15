import sendHttpLogin from "../../../http_call/HttpLogin";
import AUTH_SERVICE_URL from "../../../service_url/AuthUrlConfig";
import fetchToken from "../../../http_call/HttpFetchToken";
import { Buffer } from 'buffer';
import setAuthToken from "../hook/setAuthToken";
import encryptData from "../../JWT_Keys/key";
import useJWT from "../../JWT/useJWT";
async function login(user) {
    try {
    const email = user.email;
    const password = user.pass;
    const credentials = `${email}:${password}`;
    const encryptedInfo = await encryptData(credentials)
   // console.log(encryptedInfo)
    const headers = {
        'authorization': `Bearer ${encryptedInfo}`
    }
    let response = await sendHttpLogin(

        AUTH_SERVICE_URL.LOGIN, //url
        "POST",
        JSON.stringify({}), //body
        headers
    )
    return response
    }
    catch (e) {
        console.log(e.message)
    }

}

function encode(user) {
    const buffer = user.email + ":" + user.pass
    const encodedUser = Buffer.from(buffer).toString('base64')
    return "Basic " + encodedUser
}




export default login