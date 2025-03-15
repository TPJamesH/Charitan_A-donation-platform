import { Button } from "../../Headless/Button/Button";

const TimeInput = ({ modeArray,handleFunction}) => {

    let buttonStyle = "px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    let arr = []
    //push the first option
    arr.push(
        <Button
            label={modeArray[0]}
            className={buttonStyle + " border rounded-s-lg"}
            onClick = {() => handleFunction(modeArray[0])}
        />)

    // Push any options in between
    for (let i = 1; i < modeArray.length - 1; i++) {
        if (i)
            arr.push(
                <Button
                    label={modeArray[i]}
                    className={buttonStyle + " border-t border-b "}
                    onClick = {() => handleFunction(modeArray[i])}
                />)
    }

    // Push the last option
    arr.push(
        <Button
            label={modeArray[modeArray.length - 1]}
            className={buttonStyle + " border rounded-e-lg"}
            onClick = {() => handleFunction(modeArray[modeArray.length - 1])}
        />)

 return (<div className="inline-flex rounded-md shadow-sm" role="group">{arr}</div>)
   

}

export default TimeInput