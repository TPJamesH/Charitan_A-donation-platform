import Combobox from "react-widgets/Combobox";
import { HeadlessCombobox } from "./HeadlessCombobox";
import "react-widgets/styles.css";


function UserDefinedCombobox({
    containerClassName,
    data,
    dataKey,
    placeholder,
    textField,
    handleFunction
}) {
    return (
        <HeadlessCombobox
            containerClassName={containerClassName}
            data={data}
            dataKey={dataKey}
            placeholder={placeholder}
            textField={textField}
            handleFunction={handleFunction}
        >
            {({ containerClassName, data, dataKey, placeholder, value, onChange, onSelect }) => (
                <Combobox
                    defaultValue={data[0]}
                    data={data}
                    containerClassName={containerClassName}
                    textField={textField}
                    value={value}
                    onSelect={onSelect}
                    onChange={onChange}
                    dataKey={dataKey}
                    placeholder={placeholder}
                />
            )}
        </HeadlessCombobox>
    );


}



export { UserDefinedCombobox };
