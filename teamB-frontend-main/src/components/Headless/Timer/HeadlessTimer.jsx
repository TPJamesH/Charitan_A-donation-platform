import { useState, useEffect } from "react";

const useHeadlessTimer = (initialTime, logoutCallback) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        // Load from localStorage if exists, else initialize with full time
        const savedTime = localStorage.getItem("timeLeft");
        return savedTime ? Math.max(parseInt(savedTime, 10), 0) : initialTime;
    });

    useEffect(() => {
        if (timeLeft <= 0) {
            logoutCallback(); // Trigger logout when time runs out
            localStorage.removeItem("timeLeft"); // Clear timer storage
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => {
                const newTime = prevTime - 1;
                localStorage.setItem("timeLeft", newTime); // Save remaining time
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerId); // Cleanup interval
    }, [timeLeft, logoutCallback]);

    // Function to reset timer
    const resetTimer = () => {
        setTimeLeft(initialTime);
        localStorage.setItem("timeLeft", initialTime);
    };

    // Format time as MM:SS
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    return { timeLeft, formatTime, resetTimer };
};

export default useHeadlessTimer;
