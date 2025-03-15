import login from '../api/login';
import useHeadlessTimer from "../../Headless/Timer/HeadlessTimer"; // Import timer logic

const useLogin = () => {
    const { resetTimer } = useHeadlessTimer(900, () => {}); //15 minutes

    const submitUser = async (e, reloadUsersFunc, showNotification) => {

        const email = e.email.value;
        const pass = e.password.value;
        const user = { email, pass }
        // console.log(user)
        let response = await login(user);
        if (response.status == 200) {
            // setUser({
            //     username: response.json.username,
            //     role: 'Admin'
            // });

            // Reset timer on successful login
            resetTimer();

            reloadUsersFunc();
        }
        else {
            showNotification(errorClass(response.status))

        }

        console.log(response)

    }
    return {
        // userFormRef,
        submitUser
    }
}

function errorClass(response) {
    var message = "";

    switch (response) {
        case 401:
            message = "The password is incorrect, "
            break;

        case 404:
            message = "The email does not exist, "
            break;

        default:
            message = "An unexpected error occured (empty input/network error), "
    }
    return message + "please try again"

}
export default useLogin;