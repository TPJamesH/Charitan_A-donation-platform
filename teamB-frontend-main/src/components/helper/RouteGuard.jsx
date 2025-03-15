import React from 'react';
import { Navigate } from 'react-router-dom';
import fetchToken from "../../http_call/HttpFetchToken";
import { useState, useEffect } from 'react';

const RouteGuard = ({ component: Component }) => {
    const [isVerified, setisVerified] = useState(null) //initialize


    useEffect(() => { //state update to trigger a re-render
        const check = async () => {
            const token = await fetchToken();
            // console.log(token)
            if (token.status == 200) {
                setisVerified(token.json.message)
            } else { setisVerified(false) }

        };
        check()
    }, [])

    if (isVerified === null) { //prevent premature rendering
        return <div>Loading...</div>
    }

    if (isVerified) { //conditional rendering
        return <Component />
    }
    return <Navigate to="/" />
};

export default RouteGuard