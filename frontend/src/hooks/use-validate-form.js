
const useValidateForm = () => {

    const validateInput = (input) => input.length > 0;

    return {
        validateInput
    }
};

export default useValidateForm