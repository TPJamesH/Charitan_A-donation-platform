import React, { useEffect } from "react";
import Login from "../components/Authentication-Component/Login/Login";
const Authentication = () => { 
    return (

        <div className="min-h-screen flex items-center justify-center">
            <div className=" flex flex-col bg-white w-full  sm:p-10 gap-8 rounded-md container-fluid items-center">
                <div className="grid grid-cols-1 gap-5 w-1/2">
                    <Login />
                </div>
            </div>
        </div>


    );
};

export default Authentication;
