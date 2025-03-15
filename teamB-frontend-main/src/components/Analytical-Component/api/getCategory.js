import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getAllCategories() {
    let response = await sendHttpRequest(
        AnalyticURLConfig.GET_ALL_CATEGORIES,
    );
    return response.json
}

export default getAllCategories