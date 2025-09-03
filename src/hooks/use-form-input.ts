import { useState } from "react";

const useFormInput = (validate: (input: string) => boolean) => {
    const [isTouched, setIsTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const inputValid = validate(inputValue);
    const inputInvalid = isTouched && !inputValid;

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setInputValue(e.target.value);

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