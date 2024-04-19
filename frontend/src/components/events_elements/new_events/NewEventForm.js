import { Form } from "react-router-dom";
import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import { Link } from "react-router-dom";
import classes from "./NewEventForm.module.css";
import { useRef } from "react";

const NewEventForm = () => {

    const  { nameIsValid, dateIsValid } = useValidateForm();

    const {
      inputValue: nameInputValue,
      inputInvalid: nameInputInvalid,
      handleChangeInput: nameChangeInput,
      handleIsTouched: nameIsTouched,
      handleReset: nameHandleReset,
    } = useFormInput(nameIsValid);

    const {
      inputInvalid: dateInputInvalid,
      handleChangeInput: dateChangeInput,
      handleIsTouched: dateIsTouched,
      handleReset: dateHandleReset,
    } = useFormInput(dateIsValid)

    const submitFormHandler = () => {
      nameHandleReset()
      dateHandleReset()
  };

  const nameInputIsValid = nameInputInvalid ? classes.invalid : classes.valid;
  const dateInputIsValid = dateInputInvalid ? classes.invalid : classes.valid;

  let formIsValid = false;

  if (!nameInputInvalid && nameInputValue.length > 0) {
      formIsValid = true
  };

  return (
    <Form method="POST" onSubmit={submitFormHandler} className={classes['new-event-form']}>
      <div className={classes['input-section']}>
        <label htmlFor="">Name</label>
        <input className={nameInputIsValid} type="text" name="name" onChange={nameChangeInput} onBlur={nameIsTouched}/>
      </div>
      <div className={classes['input-section']}>
        <label htmlFor="">Description</label>
        <textarea className={dateInputIsValid} type="text" name="description"/>
      </div>
      <div className={classes['input-section']}>
        <label htmlFor="">Date</label>
        <input className={dateInputIsValid} type="date" name="date" onChange={dateChangeInput} onBlur={dateIsTouched}/>
      </div>
      <div className={classes.buttons}>
        <button type="submit" disabled={!formIsValid}>Add</button>
        <button type="none" text={'Cancel'}><Link to={'/events'}>Cancel</Link></button>
      </div>
    </Form>
  );
};

export default NewEventForm;
