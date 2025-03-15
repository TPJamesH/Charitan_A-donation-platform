import { useState } from 'react';

const HeadlessForm = ({ onSubmit, children }) => {
    const [formState, setFormState] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formState)
        }
    }
    return children({
        formState,
        handleChange,
        handleSubmit
    })
}

export default HeadlessForm