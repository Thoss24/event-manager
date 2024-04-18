import { useState } from "react";

const useFormInput = (validate) => {
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const inputValid = validate(inputValue);
    const inputInvalid = isTouched && !inputValid;

    const handleChangeInput = (event) => {
        setInputValue(event.target.value)
    };

    const handleIsTouched = () => {
        setIsTouched(true)
    };

    const handleReset = () => {
        setIsTouched(false)
        setInputValue('')
    };

    return {
        inputValue,
        inputValid,
        inputInvalid,
        handleChangeInput,
        handleIsTouched,
        handleReset
    }
};

export default useFormInput