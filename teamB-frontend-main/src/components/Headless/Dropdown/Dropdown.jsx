import HeadlessDropDown from './HeadlessDropdown';

function UserDefinedDropdown({
    choice,
    handleFunction
}) {
    return (
        <HeadlessDropDown
            choice={choice}
            handleFunction={handleFunction}
        >
            {({ selectedValue, handleChange, choice }) => (
                <select value={selectedValue} onChange={handleChange} className="size-30">
                    {choice.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            )}
        </HeadlessDropDown>
    );

}



export { UserDefinedDropdown };
