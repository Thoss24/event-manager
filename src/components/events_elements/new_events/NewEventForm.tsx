import React from "react";
import useFormInput from "../../../hooks/use-form-input";
import useValidateForm from "../../../hooks/use-validate-form";
import { Link } from "react-router-dom";
import classes from "./NewEventForm.module.css";
import { useRef } from "react";
import { addEvent } from "../../../utility/events_actions/event_actions";
import { useState, useEffect } from "react";
import { getUsers } from "../../../utility/users/user_actions";
import Member from "../../users_elements/Member";
import { User as UserType, MemberType } from "../../../types/users";
import { NewEventType } from "../../../types/Events";

const API_URL = process.env.REACT_APP_API_URL;

const NewEventForm = () => {
  const { validateInput } = useValidateForm();

  const [image, setImage] = useState("");
  const [currIndex, setCurrIndex] = useState(-1);
  const [members, setMembers] = useState<UserType[]|undefined>();
  const [eventMembers, setEventMembers] = useState<MemberType[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<UserType[]|undefined>();
  const [membersSectionDisplaying, setMembersSectionDisplaying] = useState(false);
  const [requestResponseMessage, setRequestResponseMessage] = useState("");
  const [requestResponseMessageSuccess, setRequestResponseMessageSuccess] = useState(false);

  useEffect(() => {
    getUsers().then((response) => {
      if (response) {
        setMembers(response.data);
        setFilteredMembers(response.data);
      }
    });
  }, []);

  const images: string[] = [
    `/images/event_img_one.jpg`,
    `/images/event_img_two.jpg`,
    `/images/event_img_three.jpg`,
  ];

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const time = useRef<HTMLInputElement>(null);

  const {
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

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const membersIds = eventMembers.map((member) => member.id);

 const newEvent: NewEventType = {
  name: name.current?.value || undefined,
  date: date.current?.value || undefined,
  description: description.current?.value || undefined,
  imageName: image || undefined,
  time: time.current?.value || undefined,
  members: (membersIds ?? []).filter(
    (id): id is number => id !== undefined
  ),
};


      const addEventRequest = await addEvent(newEvent);
      if (addEventRequest) {
        if (!addEventRequest.message) {
        setRequestResponseMessage("Request to add event failed.");
        } 
        if (addEventRequest.status === 500) {
          setRequestResponseMessage(addEventRequest.message);
          setRequestResponseMessageSuccess(false);
          setTimeout(() => {
            setRequestResponseMessage("")
          }, 3000)
        } else {
          setRequestResponseMessage(addEventRequest.message);
          setRequestResponseMessageSuccess(true);
          setTimeout(() => {
            setRequestResponseMessage("")
          }, 3000)
        }
      }
    } catch (error) {
      console.log(error)
    }

    nameHandleReset();
    dateHandleReset();
    descriptionHandleReset();
  };

  const handleImgSelect = (index: number, img: string) => {
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

  const searchMembers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value.replace(/\s/g, "");
    const filteredResults = members && members.filter((member) => {
      const fullName = (member.first_name ?? "") + (member.last_name ?? "");
      return fullName.toLowerCase().includes(search);
    })
    setFilteredMembers(filteredResults)
    console.log(filteredMembers)
  }

  const addMemberToEvent = (member: MemberType) => {
    let memberExists = false;
    for (let i = 0; i < eventMembers.length; i++) {
      if (eventMembers[i].id === member.id) {
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

  const requestResponseArea = (
    <div className={`${classes['request-response-area']} ${!requestResponseMessageSuccess ? classes['failure'] : ''}`}>
      {requestResponseMessage}
    </div>
  );

  return (
<form onSubmit={submitFormHandler} className={classes["new-event-form"]}>
  {/* display response to user after form has been submitted */}
  {requestResponseMessage.length > 0 && requestResponseArea}

  <div className={classes["form-section"]}>
    <label htmlFor="name">Name</label>
    <input
      className={nameInputIsValid}
      type="text"
      name="name"
      onChange={nameChangeInput}
      onBlur={nameIsTouched}
      ref={name}
    />
  </div>

  <div className={classes["form-section"]}>
    <label htmlFor="description">Description</label>
    <textarea
      className={descriptionInputIsValid}
      name="description"
      onChange={descriptionChangeInput}
      onBlur={descriptionIsTouched}
      ref={description}
      rows={4}
    />
  </div>

  <div className={classes["form-section"]}>
    <label htmlFor="date">Date</label>
    <input
      className={dateInputIsValid}
      type="date"
      name="date"
      onChange={dateChangeInput}
      onBlur={dateIsTouched}
      ref={date}
    />
  </div>

  <div className={classes["form-section"]}>
    <label htmlFor="time">Time</label>
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

  <button type="button" onClick={toggleAddMembersHandler} className={classes.toggleMembersBtn}>
    {!membersSectionDisplaying ? "Add members +" : "Stop adding members"}
  </button>

  {membersSectionDisplaying && (
    <div className={classes.membersSection}>
      <input
        className={classes.search}
        type="text"
        placeholder="Search..."
        onChange={searchMembers}
      />
      <div className={classes["members"]}>
        {filteredMembers && filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <Member
              key={member.user_id}
              id={member.user_id}
              profileImage={member.profile_image}
              firstName={member.first_name}
              lastName={member.last_name}
              profileImgColor={member.profile_color}
              addMemberToEvent={addMemberToEvent}
              eventForm={true}
            />
          ))
        ) : (
          <p className={classes["no-results"]}>No results found</p>
        )}
      </div>
    </div>
  )}

  <h3>Choose an image for your event!</h3>
  <div className={classes["event-images-container"]}>
    {images.map((img, index) => (
      <img
        alt={`Event ${index}`}
        src={img}
        key={index}
        onClick={() => handleImgSelect(index, img)}
        className={`${currIndex === index ? classes["active"] : classes["event-images"]}`}
      />
    ))}
  </div>

  <div className={classes.buttons}>
    <button
      className={classes["form-btn"]}
      type="submit"
      disabled={!formIsValid}
    >
      Add
    </button>
    <Link to="/events" className={`${classes["form-btn"]} ${classes.cancelBtn}`}>
      Cancel
    </Link>
  </div>
</form>
                                  
  );
};

export default NewEventForm;
