export default async function sendHttpRequest(
    url,
    method = 'GET',
    body = null,
    headers
) {

    let response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        method: method,
        body: body,
        credentials: 'include'
    })

    let jsonData = ""

    try {
        jsonData = await response.json()
    } catch {
        jsonData = "{}"
    }

    return {
        json: jsonData,
        status: response.status,
        responseHeader: response.headers
    }
}

