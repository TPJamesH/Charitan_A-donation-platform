import { useState } from 'react'

const HeadlessNotification = ({ children }) => {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    const showNotification = (msg) => {
        setShow(true)
        setMessage(msg);
    }

    const hideNotification = () => {
        setShow(false);
        setMessage("")
    }

    return children({
        show,
        message,
        showNotification,
        hideNotification
    })
}

export { HeadlessNotification }