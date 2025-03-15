import sendHttpRequest from "../../../http_call/HttpRequest";
import CharityURLConfig from "../../../service_url/CharityURLConfig";

async function getAllCharities() {
    let response = await sendHttpRequest(
        CharityURLConfig.CHARITIES_SERVICE_URL,
    );
    return response.json
}

export default getAllCharities