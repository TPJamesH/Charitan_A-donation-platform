import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getTotalProjectStatus(period) {

    if (period.length != 0) {
        try {
            let response = await sendHttpRequest(
                AnalyticURLConfig.TOTAL_PROJECT_STATUS + `/${period}`,
            );

            console.log(response)
            return response.json
        }
        catch (error) {
            console.error(error)
        }
    }

}

export default getTotalProjectStatus