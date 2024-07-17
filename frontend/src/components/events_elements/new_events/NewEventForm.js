import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import { Link } from "react-router-dom";
import classes from "./NewEventForm.module.css";
import { useRef } from "react";
import addEvent from "../../../utility/events_actions/add_event";
import { useState, useEffect } from "react";
import getUsers from "../../../utility/users/get_users";

const NewEventForm = () => {
  const { validateInput } = useValidateForm();

  const [image, setImage] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const [members, setMembers] = useState();
  const [membersSectionDisplaying, setMembersSectionDisplaying] = useState(false);

  useEffect(() => {
    getUsers().then((response) => {
      if (response != "undefined") {
        setMembers(response.data);
      }
    });
  }, []);

  const images = [
    "http://localhost:3001/images/event_img_one.jpg",
    "http://localhost:3001/images/event_img_two.jpg",
    "http://localhost:3001/images/event_img_three.jpg",
  ];

  const name = useRef();
  const description = useRef();
  const date = useRef();
  const time = useRef();

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
      imageName: image,
      time: time.current.value,
    };

    addEvent(newEvent);

    nameHandleReset();
    dateHandleReset();
    descriptionHandleReset();
  };

  const handleImgSelect = (index, img) => {
    const splitUrl = img.split("/");
    const imageName = splitUrl[splitUrl.length - 1];

    setImage(imageName);
    setCurrIndex(index);
    console.log(image);
  };

  const toggleAddMembersHandler = () => {
    setMembersSectionDisplaying((state) => {
      return !state;
    });
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
      <div className={classes["input-section"]}>
        <label htmlFor="">Time</label>
        <input type="time" name="time" defaultValue={"00:00"} ref={time} />
      </div>
      <button type="button" onClick={toggleAddMembersHandler}>
        {!membersSectionDisplaying ? "Add members +" : "Hide"}
      </button>
      {membersSectionDisplaying && (
        <ul className={classes["members"]}>
          {members &&
            members.map((member) => (
              <li>
                {member.first_name} {member.last_name}
              </li>
            ))}
        </ul>
      )}
      <h3>Choose an image for your event!</h3>
      <div className={classes["event-images-container"]}>
        {images.map((img, index) => (
          <img
            src={img}
            key={index}
            onClick={() => handleImgSelect(index, img)}
            className={`${
              currIndex === index ? classes["active"] : classes["event-images"]
            }`}
          />
        ))}
      </div>
      <div className={classes.buttons}>
        <button
          className={classes["form-buttons"]}
          type="submit"
          disabled={!formIsValid}
        >
          Add
        </button>
        <button className={classes["form-buttons"]} type="none" text={"Cancel"}>
          <Link to={"/events"}>Cancel</Link>
        </button>
      </div>
    </form>
  );
};

export default NewEventForm;
