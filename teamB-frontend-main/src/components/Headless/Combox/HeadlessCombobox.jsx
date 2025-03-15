import { useState } from 'react'

const HeadlessCombobox = ({ children,...props}) => {
    const firstItem = props.data[0]
    const fieldValue = firstItem[props.textField]
    const [value, setValue] = useState(fieldValue || '');

    const handleChange = (value) => {
        setValue(value);
    };
   //  console.log(props.name + ": " + value)


   const handleSelect = (value) => {
    localStorage.setItem(value[props.dataKey], JSON.stringify(value));
            props.handleFunction(value[props.dataKey])
   };
    
    return children({
        value,
        onChange: handleChange, 
        onSelect: handleSelect,
        ...props 
    });
   

    
}

export { HeadlessCombobox }