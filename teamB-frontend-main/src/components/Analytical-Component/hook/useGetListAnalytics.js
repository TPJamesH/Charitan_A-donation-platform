import { useState, useEffect } from 'react';

const useGetListAnalytic = (loadItemApi) => {
    const [value, setValue] = useState([]);
    const [category,setCategory] = useState("")
    async function fetchValue() {
        try {
            const result = await loadItemApi()
            setValue(result)
        }

        catch (error) {
            console.log(error)
        }

    }

    async function fetchValueInput(input) {
        try {
            const result = await loadItemApi(input)
            setValue(result)
            setCategory(input)
        }

        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => { fetchValue()}, [loadItemApi])

    return {value,category,setCategory,fetchValue,fetchValueInput,setValue};
}

export default useGetListAnalytic