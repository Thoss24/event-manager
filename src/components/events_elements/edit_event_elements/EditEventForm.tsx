import React from "react";
import { Form } from "react-router-dom";
import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import classes from "./EditEventForm.module.css";
import { Link } from "react-router-dom";
import { editEvent } from "../../../utility/events_actions/event_actions";
import { useRef, FormEvent } from "react";


type EditEventFormProps = {
  name: string;
  description: string;
  date: string;
  eventId: number; 
};

const EditEventForm: React.FC<EditEventFormProps> = ({
  name,
  description,
  date,
  eventId,
}) => {
  const { validateInput } = useValidateForm();

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null);

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

  const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !nameInputRef.current ||
      !dateInputRef.current ||
      !descriptionInputRef.current
    ) {
      return;
    }

    const editedEvent = {
      name: nameInputRef.current.value,
      description: descriptionInputRef.current.value,
      date: dateInputRef.current.value,
      eventId,
    };

    editEvent(editedEvent);
    handleNameReset();
    handleDateReset();
    handleDescriptionReset();
  };

  const nameInputIsValid = nameInputInvalid ? classes.invalid : classes.valid;
  const dateInputIsValid = dateInputInvalid ? classes.invalid : classes.valid;
  const descriptionInputIsValid = descriptionInputInvalid
    ? classes.invalid
    : classes.valid;

  let formIsValid = false;
  if (
    !nameInputInvalid &&
    nameInputValue.length > 0 &&
    descriptionInputValue.length > 0
  ) {
    formIsValid = true;
  }

  return (
<Form
  method="PATCH"
  onSubmit={submitFormHandler}
  className={classes["edit-event-form"]}
>
  <div className={classes["form-section"]}>
    <label htmlFor="name">Name</label>
    <input
      ref={nameInputRef}
      className={nameInputIsValid}
      type="text"
      name="name"
      onChange={handleNameChange}
      onBlur={handleNameIsTouched}
      defaultValue={name}
    />
  </div>

  <div className={classes["form-section"]}>
    <label htmlFor="description">Description</label>
    <textarea
      ref={descriptionInputRef}
      className={descriptionInputIsValid}
      name="description"
      onChange={handleDescriptionChange}
      onBlur={handleDescriptionIsTouched}
      defaultValue={description}
      rows={4}
    />
  </div>

  <div className={classes["form-section"]}>
    <label htmlFor="date">Date</label>
    <input
      ref={dateInputRef}
      className={dateInputIsValid}
      type="date"
      name="date"
      onChange={handleDateChange}
      onBlur={handleDateIsTouched}
      defaultValue={date}
    />
  </div>

  <div className={classes.buttons}>
    <button type="submit" disabled={!formIsValid}>
      Done
    </button>
    <Link to="/events" className={classes.cancelBtn}>
      Cancel
    </Link>
  </div>
</Form>
  );
};

export default EditEventForm;
