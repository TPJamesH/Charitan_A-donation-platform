import {useState} from 'react';

const HeadlessDropDown = ({ children,...props}) => {
    const [selectedValue, setSelectedValue] = useState(props.choice[0]);
  
    const handleChange = (e) => {
      setSelectedValue(e.target.value);
      props.handleFunction(e.target.value)
    };
  
    return children({
      selectedValue,
      handleChange,
      ...props
    });
  };

export default HeadlessDropDown