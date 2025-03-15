import sendHttpRequest from "../../../http_call/HttpRequest";
import AnalyticURLConfig from "../../../service_url/AnalyticURLConfig";

async function getTotalProject(category) {
    if (category.length != 0) {
        try {
            const queryString = new URLSearchParams({ [`query[${category}]`]: category }).toString()
            console.log(`${AnalyticURLConfig.GET_PROJECT_BY}?${queryString}`)
            let response = await sendHttpRequest(
                `${AnalyticURLConfig.GET_PROJECT_BY}?${queryString}`,
            );
            console.log(response)
            let projectStat = response.json
        
                let array = [{
                    countProject: `$${projectStat.total}`,
                }]
            return array
        }
        catch (error) {
            console.error(error)
        }
    }
}

export default getTotalProject