import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import { Link } from "react-router-dom";
import classes from "./NewEventForm.module.css";
import { useRef } from "react";
import addEvent from "../../../utility/add_event";
import { useState } from "react";

const NewEventForm = () => {
  const { validateInput } = useValidateForm();

  const [image, setImage] = useState("");

  const name = useRef();
  const description = useRef();
  const date = useRef();

  const {
    inputValue: nameInputValue,
    inputValid: nameValid,
    inputInvalid: nameInputInvalid,
    handleChangeInput: nameChangeInput,
    handleIsTouched: nameIsTouched,
    handleReset: nameHandleReset,
  } = useFormInput(validateInput);

  const {
    inputInvalid: dateInputInvalid,
    inputValid: dateValid,
    handleChangeInput: dateChangeInput,
    handleIsTouched: dateIsTouched,
    handleReset: dateHandleReset,
  } = useFormInput(validateInput);

  const {
    inputInvalid: descriptionInputInvalid,
    inputValid: descriptionValid,
    handleChangeInput: descriptionChangeInput,
    handleIsTouched: descriptionIsTouched,
    handleReset: descriptionHandleReset,
  } = useFormInput(validateInput);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const newEvent = {
      name: name.current.value,
      date: date.current.value,
      description: description.current.value,
      imageName: image
    };

    addEvent(newEvent);

    nameHandleReset();
    dateHandleReset();
    descriptionHandleReset();
  };

  const selectImage = (event) => {
    const imageUrl = event.target.src;
    const imageNameArr = imageUrl.split("/");
    const imageName = imageNameArr[imageNameArr.length - 1];

    setImage(imageName);
  };

  const nameInputIsValid = nameInputInvalid ? classes.invalid : classes.valid;
  const dateInputIsValid = dateInputInvalid ? classes.invalid : classes.valid;
  const descriptionInputIsValid = descriptionInputInvalid
    ? classes.invalid
    : classes.valid;

  let formIsValid = false;

  if (nameValid && dateValid && descriptionValid) {
    formIsValid = true;
  }

  return (
    <form onSubmit={submitFormHandler} className={classes["new-event-form"]}>
      <div className={classes["input-section"]}>
        <label htmlFor="">Name</label>
        <input
          className={nameInputIsValid}
          type="text"
          name="name"
          onChange={nameChangeInput}
          onBlur={nameIsTouched}
          ref={name}
        />
      </div>
      <div className={classes["input-section"]}>
        <label htmlFor="">Description</label>
        <textarea
          className={descriptionInputIsValid}
          type="text"
          name="description"
          onChange={descriptionChangeInput}
          onBlur={descriptionIsTouched}
          ref={description}
        />
      </div>
      <div className={classes["input-section"]}>
        <label htmlFor="">Date</label>
        <input
          className={dateInputIsValid}
          type="date"
          name="date"
          onChange={dateChangeInput}
          onBlur={dateIsTouched}
          ref={date}
        />
      </div>
      <h3>Choose an image for your event!</h3>
      <div className={classes["event-images-container"]}>
        <img
          className={classes["event-images"]}
          src="http://localhost:3001/images/event_img_one.jpg"
          alt=""
          onClick={selectImage}
        />
        <img
          className={classes["event-images"]}
          src="http://localhost:3001/images/event_img_two.jpg"
          alt=""
          onClick={selectImage}
        />
        <img
          className={classes["event-images"]}
          src="http://localhost:3001/images/event_img_three.jpg"
          alt=""
          onClick={selectImage}
        />
      </div>
      <div className={classes.buttons}>
        <button type="submit" disabled={!formIsValid}>
          Add
        </button>
        <button type="none" text={"Cancel"}>
          <Link to={"/events"}>Cancel</Link>
        </button>
      </div>
    </form>
  );
};

export default NewEventForm;
