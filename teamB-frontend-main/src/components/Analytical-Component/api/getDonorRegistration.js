import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getDonorRegistration(period) {
    if (period.length != 0) {
        let response = await sendHttpRequest(AnalyticURLConfig.DONOR_REGISTRATION + `/${period}`,
        
        );
        console.log(response)
        return response.json
    }
}

export default getDonorRegistration