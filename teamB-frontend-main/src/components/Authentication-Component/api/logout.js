import sendHttpRequest from "../../../http_call/HttpRequest";
import AUTH_SERVICE_URL from "../../../service_url/AuthUrlConfig";

async function logOut() {
    let response = await sendHttpRequest(

        AUTH_SERVICE_URL.LOGOUT, //url
        "DELETE"
    )
    return response
}


export default logOut