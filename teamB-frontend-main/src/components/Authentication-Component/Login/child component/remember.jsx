import { InputGroup } from "../../../Headless/Input/Input";
const Remember = () => {
    return (
        <div className="flex items-start mb-5">
            <div className="flex items-center h-1">
                <InputGroup name="remember"
                    classNameInput="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    type="checkbox"
                    classNameLabel="ms-2 text-sm font-medium text-gray-900 "
                    label="Keep me signed in" />
            </div>

        </div>)
};

export default Remember