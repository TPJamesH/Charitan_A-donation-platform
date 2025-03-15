import logOut from "../api/logout";
import { useNavigate } from "react-router-dom";
import useHeadlessTimer from "../../Headless/Timer/HeadlessTimer";

export default function useLogout() {
    const navigate = useNavigate();
    const { resetTimer } = useHeadlessTimer(900, () => {});

    const logoutFunction = async (e) => {
        e.preventDefault();
        await logOut();
        resetTimer(); // Reset the timer on logout
        navigate("/");
    };

    return logoutFunction;
}
