export default async function fetchToken(
) {

    let response = await fetch("http://localhost:3000/api/auth/refresh", {
        method: 'POST',
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

