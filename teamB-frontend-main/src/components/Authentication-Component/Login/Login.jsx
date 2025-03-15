import React from "react";
import logo from '../../../assets/Header_Icon/Logo.png'
import { InputGroup } from "../../Headless/Input/Input";
import Remember from "./child component/remember";
import { Button } from "../../Headless/Button/Button";
import useLogin from "../hook/useLogin";
import { Notification } from 'rsuite'
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import { HeadlessNotification } from "../../Headless/Notification/HeadlessNotification";
const Login = () => {

    const { submitUser } = useLogin();

    const navigate = useNavigate();
    const handleRedirectLogin = () => { navigate("/admin/dashboard") };


    return (
        <div className="flex flex-col bg-white w-full  sm:p-10 gap-8 rounded-md">
            <img src={logo} className=" rounded-lg mx-auto size-48 h-auto max-[769px]:translate-y-11 max-[426px]:translate-y-11 max-[321px]:translate-y-12" />

            <InputGroup
                label="Email"
                name="email"
                type="email"
                placeholder="JohnDoe@example.com"
                required={true}
            />
            <InputGroup
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required={true}
            />

            <HeadlessNotification>
                {({ show, message, showNotification, hideNotification }) => (
                    <>
                        <div className="flex justify-center"> {show ?
                            <Notification type="error" header="Error" closable>
                                {message}
                            </Notification>
                            : null}
                        </div>

                        <Button type="submit"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" label="Login"
                            onClick={(e) => {
                                e.preventDefault()
                                hideNotification()
                                submitUser({ email, password }, handleRedirectLogin, showNotification);
                            }}
                        />
                    </>
                )}
            </HeadlessNotification>

            <Remember />

        </div>
    )
}

export default Login