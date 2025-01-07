import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import { Link } from "react-router-dom";
import classes from "./NewEventForm.module.css";
import { useRef } from "react";
import addEvent from "../../../utility/events_actions/add_event";
import { useState, useEffect } from "react";
import getUsers from "../../../utility/users/get_users";
import Member from "../../users_elements/Member";

const NewEventForm = () => {
  const { validateInput } = useValidateForm();

  const [image, setImage] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const [members, setMembers] = useState();
  const [eventMembers, setEventMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState();
  const [membersSectionDisplaying, setMembersSectionDisplaying] = useState(false);

  useEffect(() => {
    getUsers().then((response) => {
      if (response != "undefined") {
        setMembers(response.data);
        setFilteredMembers(response.data);
      }
    });
  }, []);

  const images = [
    "/images/event_img_one.jpg",
    "/images/event_img_two.jpg",
    "/images/event_img_three.jpg",
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

    const membersIds = eventMembers.map((member) => member.id);

    const newEvent = {
      name: name.current.value,
      date: date.current.value,
      description: description.current.value,
      imageName: image,
      time: time.current.value,
      members: membersIds
    };

    console.log(newEvent)

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

  const searchMembers = (event) => {
    const search = event.target.value.replace(/\s/g, "");
    const filteredResults = members.filter((member) => {
      const fullName = member.first_name + member.last_name;
      return fullName.toLowerCase().includes(search);
    })
    setFilteredMembers(filteredResults)
    console.log(filteredMembers)
  }

  const addMemberToEvent = (member) => {
    let memberExists = false;
    for (let i = 0; i < eventMembers.length; i++) {
      if (eventMembers[i].id == member.id) {
        memberExists = true;
      }
    }

    if (!memberExists) {
      setEventMembers(eventMembers => [...eventMembers, member])
    }
  }

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
        <h3>Name</h3>
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
        <h3>Description</h3>
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
        <h3>Date</h3>
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
        <h3>Time</h3>
        <input type="time" name="time" defaultValue={"00:00"} ref={time} />
      </div>
      <h3>Members</h3>
      <div className={classes["event-members"]}>
        {eventMembers.map((member) => (
          <Member 
          key={member.id}
          id={member.id}
          profileImage={member.profileImage}
          firstName={member.firstName}
          lastName={member.lastName}
          profileImgColor={member.profileImageColor}
          />
        ))}
      </div>
      <button type="button" onClick={toggleAddMembersHandler}>
        {!membersSectionDisplaying ? "Add members +" : "Stop adding members"}
      </button>
      {membersSectionDisplaying && (
        <div>
        <input className={classes.search} type="text" placeholder="Search..." onChange={searchMembers}/>
        <div className={classes["members"]}>
          {filteredMembers.length > 0 ?
            filteredMembers.map((member) => (
              <Member
                key={member.user_id}
                id={member.user_id}
                profileImage={member.profile_image}
                firstName={member.first_name}
                lastName={member.last_name}
                profileImgColor={member.profile_color}
                addMemberToEvent={addMemberToEvent}
              />
          )) : <p className={classes['no-results']}>No results found</p>}
        </div>
        </div>
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
