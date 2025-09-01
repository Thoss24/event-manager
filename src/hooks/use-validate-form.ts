
const useValidateForm = () => {

    const validateInput = (input: string) => input.length > 0;

    return {
        validateInput
    }
};

export default useValidateForm