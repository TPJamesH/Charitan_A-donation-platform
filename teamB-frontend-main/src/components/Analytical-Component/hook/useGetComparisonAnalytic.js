import { useState, useEffect } from 'react';

const useGetComparisonAnalytic = (loadItemApi) => {
    const [value, setValue] = useState([]);
    const [inputs, setInputs] = useState({
        category1: '',
        category2: '',
        region1: '',
        region2: ''
    })

    const handleInputChange = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }


    async function fetchValueInput(input) {
        try {
            const result = await loadItemApi(input)
            setValue(result)
        }

        catch (error) {
            console.log(error)
        }

    }

    return { value, inputs, handleInputChange, fetchValueInput, setValue };
}

export default useGetComparisonAnalytic