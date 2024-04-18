
const useValidateForm = () => {
    const nameIsValid = (str) => str.length > 0

    const dateIsValid = (date) => date.includes("-")

    return {
        nameIsValid,
        dateIsValid
    }
};

export default useValidateForm