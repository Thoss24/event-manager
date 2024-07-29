import Button from "../../ui/Button";
import classes from "./EventDetails.module.css";
import { useNavigate } from "react-router-dom";
import checkAccountType from "../../../utility/authentication/check_account_type";
import { useEffect, useState } from "react";
import bookEvent from "../../../utility/events_actions/book_event";
import { modalActions } from "../../../store/event_details_modal_slice";
import { useDispatch } from "react-redux";

const EventDetails = (props) => {

  const [userAuth, setUserAuth] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    checkAccountType().then((response) => {
      if (response) {
        setUserAuth(response.data[0].account_type);
      }
    });
  }, [userAuth]);

  const proceedToEdit = () => {
    navigate("edit");
  };

  const deleteEvent = () => {

  }

  const bookEventHandler = () => {
    dispatch(modalActions.showEventDetailsModal())
  }

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>
        <h4>{props.date}</h4>
      </div>
      <div className={classes.buttons}>
        {userAuth === "admin" && (
          <Button text={"Edit"} onclick={proceedToEdit} />
        )}
        <Button text={"Delete"} />
        <Button text={"Book Event"} onclick={bookEventHandler}/>
        <Button link={".."} text={"Back"} />
      </div>
    </div>
  );
};

export default EventDetails;
