import { Form } from "react-router-dom";
import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import classes from "./EditEventForm.module.css";
import { Link } from "react-router-dom";
import { editEvent } from "../../../utility/events_actions/edit_event";
import { useRef } from "react";

const EditEventForm = (props) => {

    const { validateInput } = useValidateForm();

    const nameInputRef = useRef(!null);
    const dateInputRef = useRef(!null);
    const descriptionInputRef = useRef(!null);

    const {
        inputValue: nameInputValue,
        inputInvalid: nameInputInvalid,
        handleChangeInput: handleNameChange,
        handleIsTouched: handleNameIsTouched,
        handleReset: handleNameReset,
    } = useFormInput(validateInput);

    const {
        inputInvalid: dateInputInvalid,
        handleChangeInput: handleDateChange,
        handleIsTouched: handleDateIsTouched,
        handleReset: handleDateReset,
    } = useFormInput(validateInput);

    const {
        inputValue: descriptionInputValue,
        inputInvalid: descriptionInputInvalid,
        handleChangeInput: handleDescriptionChange,
        handleIsTouched: handleDescriptionIsTouched,
        handleReset: handleDescriptionReset,
    } = useFormInput(validateInput);

    const submitFormHandler = (event) => {

        event.preventDefault()

        const editedEvent = {
            name: nameInputRef.current.value,
            description: descriptionInputRef.current.value,
            date: dateInputRef.current.value,
            eventId: props.eventId
        };

        editEvent(editedEvent)
        handleNameReset();
        handleDateReset();
        handleDescriptionReset();
    };

    const nameInputIsValid = nameInputInvalid ? classes.invalid : classes.valid;
    const dateInputIsValid = dateInputInvalid ? classes.invalid : classes.valid;
    const descriptionInputIsValid = descriptionInputInvalid ? classes.invalid : classes.valid;

    //const formIsValid = !nameInputInvalid && !dateInputInvalid;

    let formIsValid = false;

    if (!nameInputInvalid && nameInputValue.length > 0 && descriptionInputValue.length > 0) {
        formIsValid = true
    };
   
    return (
        <Form method="PATCH" onSubmit={submitFormHandler} className={classes['edit-event-form']}>
            <div className={classes['input-section']}>
                <label htmlFor="name">Name</label>
                <input ref={nameInputRef} className={nameInputIsValid} type="text" name="name" onChange={handleNameChange} onBlur={handleNameIsTouched} defaultValue={props.name}/>
            </div>
            <div className={classes['input-section']}>
                <label htmlFor="name">Description</label>
                <textarea ref={descriptionInputRef} className={descriptionInputIsValid} name="description" onChange={handleDescriptionChange} onBlur={handleDescriptionIsTouched} defaultValue={props.description}/>
            </div>
            <div className={classes['input-section']}>
                <label htmlFor="date">Date</label>
                <input ref={dateInputRef} className={dateInputIsValid} type="date" name="date" onChange={handleDateChange} onBlur={handleDateIsTouched} defaultValue={props.date}/>
            </div>
            <div className={classes.buttons}>
            <button type="submit" disabled={!formIsValid}>Done</button>
            <button type="none" ><Link to={'/events'}>Cancel</Link></button>
            </div>
        </Form>
    )
};

export default EditEventForm