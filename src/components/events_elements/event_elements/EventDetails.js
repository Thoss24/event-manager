import Button from "../../ui/Button";
import classes from "./EventDetails.module.css";
import { useNavigate } from "react-router-dom";
import checkAccountType from "../../../utility/authentication/check_account_type";
import { useEffect, useState } from "react";
import bookEvent from "../../../utility/events_actions/book_event";
import { modalActions } from "../../../store/event_details_modal_slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { deleteEvent } from "../../../utility/events_actions/delete_event";
import Member from "../../users_elements/Member";

const EventDetails = (props) => {
  const [userAuth, setUserAuth] = useState();
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAccountTypeHandler = async () => {
      try {
        const response = await checkAccountType();

        if (response) {
          setUserAuth(response.data[0]);
        }
      } catch (error) {
        console.log("Could not fetch account information", error);
      }
    };

    checkAccountTypeHandler();
  }, []);

  const proceedToEdit = () => {
    navigate("edit");
  };

  const bookEventHandler = () => {
    dispatch(modalActions.bookEventModalHandler());
  };

  const confirmBookEventHandler = async (confirm) => {
    if (confirm) {
      const bookEventRequest = await bookEvent(
        props.id,
        userAuth[0].user_id
      );

      if (bookEventRequest.status === 200) {
        setConfirmationMsg(bookEventRequest.data);
      }

      setTimeout(() => {
        setConfirmationMsg("");
        dispatch(modalActions.hideBookEventModal());
        window.location.href = "http://localhost:3000/";
      }, 2000);
    } else {
      dispatch(modalActions.hideBookEventModal());
    }
  };

  const deleteEventModalDisplaying = useSelector(
    (state) => state.eventsModal.deleteEventDetailsModalDisplaying
  );

  const bookEventModalDisplaying = useSelector(
    (state) => state.eventsModal.bookEventModalDisplaying
  );

  const deleteEventHandler = () => {
    dispatch(modalActions.eventDetailsModalHandler());
  };

  const confirmDeleteEventHandler = async (confirm) => {
    if (confirm) {
      const deletedEvent = await deleteEvent(props.id);

      console.log("Deleted event: ", deletedEvent)

      if (deletedEvent.status === 200) {
        setConfirmationMsg("Event successfully deleted.");
      }

      setTimeout(() => {
        setConfirmationMsg("");
        dispatch(modalActions.eventDetailsModalHandler());
        window.location.href = "/events";
      }, 2000);
    } else {
      dispatch(modalActions.eventDetailsModalHandler());
    }
  };

  const membersSection = (
    <>
      <h3>Members</h3>
      <div>
        {props.users.map((user) => (
          <Member
            firstName={user.firstName}
            lastName={user.lastName}
            key={user.userId}
            profileImgColor={user.profileColor}
            profileImage={user.profileImage}
          />
        ))}
      </div>
    </>
  );

  return (
    <div className={classes.container}>
      {deleteEventModalDisplaying && (
        <ConfirmationModal
          confirmationMessage={confirmationMsg}
          confirmAction={confirmDeleteEventHandler}
          message={"Are you sure you want to delete this event?"}
        />
      )}

      {bookEventModalDisplaying && (
        <ConfirmationModal
          confirmationMessage={confirmationMsg}
          confirmAction={confirmBookEventHandler}
          message={"Are you sure you want to book this event?"}
        />
      )}

      <div className={classes.details}>
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>
        <h4>{props.date}</h4>
        <div className={classes.members}>
          {props.users.length > 0 && membersSection}
        </div>
      </div>
      <div className={classes.buttons}>
        {userAuth && userAuth.user_id === props.eventCreatorId && (
          <Button text={"Edit"} onclick={proceedToEdit} />
        )}
        {userAuth && userAuth.user_id === props.eventCreatorId && (
          <Button text={"Delete"} onclick={deleteEventHandler} />
        )}
        <Button text={"Book Event"} onclick={bookEventHandler} />
        <Button link={".."} text={"Back"} />
      </div>
    </div>
  );
};

export default EventDetails;
