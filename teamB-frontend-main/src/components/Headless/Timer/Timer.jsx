import React from "react";
import useHeadlessTimer from "./HeadlessTimer";

const Timer = ({ initialTime, logoutCallback, isLoggedIn }) => {
    const { formatTime } = useHeadlessTimer(initialTime, logoutCallback);

    if (!isLoggedIn) return null; // Hide timer if not logged in

    return (
        <div
            className="fixed bottom-4 right-4 bg-black opacity-90 text-white p-3 rounded-md shadow-lg z-50"
            style={{ minWidth: "150px", textAlign: "center" }}
        >
            <p>Time Left</p>
            <strong>{formatTime()}</strong>
        </div>
    );
};

export default Timer;
