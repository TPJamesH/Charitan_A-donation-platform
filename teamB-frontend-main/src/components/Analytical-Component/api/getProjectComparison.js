import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getProjectComparison(body_input) {
    if (body_input.length != 0) {
        try {
            let response = await sendHttpRequest(
                AnalyticURLConfig.PROJECT_COMPARISON,
                "GET",
                JSON.stringify({body_input})
            );

            console.log(response)
            return response.json
        }
        catch (error) {
            console.error(error)
        }
    }
}

export default getProjectComparison