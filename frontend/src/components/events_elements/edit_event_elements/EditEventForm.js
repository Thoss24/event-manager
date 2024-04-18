import { Form } from "react-router-dom";
import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import classes from "./EditEventForm.module.css";
import { Link } from "react-router-dom";

const EditEventForm = (props) => {

    const { nameIsValid, dateIsValid } = useValidateForm();

    const {
        inputValue: nameInputValue,
        inputInvalid: nameInputInvalid,
        handleChangeInput: handleNameChange,
        handleIsTouched: handleNameIsTouched,
        handleReset: handleNameReset,
    } = useFormInput(nameIsValid);

    const {
        inputInvalid: dateInputInvalid,
        handleChangeInput: handleDateChange,
        handleIsTouched: handleDateIsTouched,
        handleReset: handleDateReset,
    } = useFormInput(dateIsValid);

    const submitFormHandler = () => {
        handleNameReset();
        handleDateReset();
    };

    const nameInputIsValid = nameInputInvalid ? classes.invalid : classes.valid;
    const dateInputIsValid = dateInputInvalid ? classes.invalid : classes.valid;
    //const formIsValid = !nameInputInvalid && !dateInputInvalid;

    let formIsValid = false;

    if (!nameInputInvalid && nameInputValue.length > 0) {
        formIsValid = true
    };
   
    return (
        <Form method="PATCH" onSubmit={submitFormHandler} className={classes['edit-event-form']}>
            <h1>Edit Event Page</h1>
            <div className={classes['input-section']}>
                <label htmlFor="name">Name</label>
                <input className={nameInputIsValid} type="text" name="name" onChange={handleNameChange} onBlur={handleNameIsTouched} defaultValue={props.name}/>
            </div>
            <div className={classes['input-section']}>
                <label htmlFor="date">Date</label>
                <input className={dateInputIsValid} type="date" name="date" onChange={handleDateChange} onBlur={handleDateIsTouched} defaultValue={props.date}/>
            </div>
            <div className={classes.buttons}>
            <button type="submit" disabled={!formIsValid}>Done</button>
            <button type="none" ><Link to={'/events'}>Cancel</Link></button>
            </div>
        </Form>
    )
};

export default EditEventForm