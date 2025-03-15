import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getAllRegion() {
    let response = await sendHttpRequest(
        AnalyticURLConfig.GET_ALL_REGION,
    );
    return response.json
}

export default getAllRegion