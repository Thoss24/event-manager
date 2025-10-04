import React from "react";
import Button from "../../ui/Button";
import classes from "./EventDetails.module.css";
import { useNavigate } from "react-router-dom";
import { checkAccountType } from "../../../utility/authentication/auth_actions";
import { useEffect, useState } from "react";
import { bookEvent, deleteEvent } from "../../../utility/events_actions/event_actions";
import { modalActions } from "../../../store/event_details_modal_slice";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../ui/ConfirmationModal";
import Member from "../../users_elements/Member";
import { EventUser } from "../../../types/Events";
import { RootState } from "../../../store/store_index";

const API_URL = process.env.REACT_APP_API_URL;

interface EventDetailsProps {
  id: number;
  name: string;
  description: string;
  date: string;
  users: EventUser[];
  eventCreatorId: number;
}

interface UserAuth {
  user_id: number;
  [key: string]: any; // if API returns extra stuff
}

const EventDetails: React.FC<EventDetailsProps> = (props) => {
  const [userAuth, setUserAuth] = useState<UserAuth | null>(null);
  const [deleteEventModalMessage, setDeleteEventModalMessage] = useState(
    "Are you sure you want to delete this event?"
  );
  const [bookEventModalMessage, setBookEventModalMessage] = useState(
    "Are you sure you want to book this event?"
  );

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

  const confirmBookEventHandler = async (confirm: boolean) => {
    if (confirm && userAuth) {
      try {
        const bookEventRequest = await bookEvent(props.id, userAuth.user_id);

        if (bookEventRequest && bookEventRequest.status === 200) {
          setBookEventModalMessage(bookEventRequest.data);

          setTimeout(() => {
            dispatch(modalActions.bookEventModalHandler());
            navigate('/app/booked-events');
          }, 2000);
        }
      } catch (error: any) {
        setBookEventModalMessage(
          error.response ? error.response.data : "Could not book event"
        );
      }
    } else {
      dispatch(modalActions.bookEventModalHandler());
    }
  };

  const deleteEventModalDisplaying = useSelector(
    (state: RootState) => state.eventsModal.deleteEventDetailsModalDisplaying
  );

  const bookEventModalDisplaying = useSelector(
    (state: RootState) => state.eventsModal.bookEventModalDisplaying
  );

  const deleteEventHandler = () => {
    dispatch(modalActions.eventDetailsModalHandler());
  };

  const confirmDeleteEventHandler = async (confirm: boolean) => {
    if (confirm) {
      try {
        const deletedEventRequest = await deleteEvent(props.id);

        if (deletedEventRequest && deletedEventRequest.status === 200) {
          setDeleteEventModalMessage(deletedEventRequest.data);

          setTimeout(() => {
            dispatch(modalActions.eventDetailsModalHandler());
            window.location.href = `${API_URL}/events`;
          }, 2000);
        }
      } catch (error: any) {
        setDeleteEventModalMessage(
          error.response ? error.response.data : "Could not delete event"
        );
      }
    } else {
      dispatch(modalActions.eventDetailsModalHandler());
    }
  };

  return (
    <div className={classes.container}>
      {deleteEventModalDisplaying && (
        <ConfirmationModal
          confirmAction={confirmDeleteEventHandler}
          message={deleteEventModalMessage}
        />
      )}

      {bookEventModalDisplaying && (
        <ConfirmationModal
          confirmAction={confirmBookEventHandler}
          message={bookEventModalMessage}
        />
      )}

      <div className={classes.details}>
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>
        <h4>{props.date}</h4>
        <div className={classes.members}>
          {props.users.length > 0 && (
            <>
              <h3>Members</h3>
              <div>
                {props.users.map((user) => (
                  <Member
                    firstName={user.firstName}
                    lastName={user.lastName}
                    key={user.userId}
                    id={user.userId}
                    profileImgColor={user.profileColor}
                    profileImage={user.profileImage}
                    eventForm={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className={classes.buttons}>
        {userAuth && userAuth.user_id === props.eventCreatorId && (
          <>
            <Button text={"Edit"} onClick={proceedToEdit} />
            <Button text={"Delete"} onClick={deleteEventHandler} />
          </>
        )}
        <Button text={"Book Event"} onClick={bookEventHandler} />
        <Button link={".."} text={"Back"} />
      </div>
    </div>
  );
};

export default EventDetails;
