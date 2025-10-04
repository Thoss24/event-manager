
import React from "react";
import { removeBookedEvent } from "../../../utility/events_actions/event_actions";
import classes from "./BookedEvents.module.css";
import { useAppDispatch, useAppSelector } from "../../../types/hooks";
import { modalActions } from "../../../store/event_details_modal_slice";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { useState, useEffect } from "react";
import { checkAccountType } from "../../../utility/authentication/auth_actions";
import { fetchEvent } from "../../../utility/events_actions/event_actions";
import { BookedEventDetailsProps } from "../../../types/Events";
import { User as UserType } from "../../../types/users";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const BookedEventDetails = ({id, name, date}: BookedEventDetailsProps) => {

  const dispatch = useAppDispatch();
  const [userAuth, setUserAuth] = useState<UserType|undefined>();
  const [eventItem, setEventItem] = useState();
  const [removeBookedEventModalMessage, setRemoveBookedEventModalMessage] = useState<string>("Are you sure you want to remove this event from your booked events?")

  const navigate = useNavigate();

  useEffect(() => {

    const fetchAccountData = async () => {
      try {
        const response = await checkAccountType();

        if (response.status === 200) {
          console.log("Account info collected successfully.")
          setUserAuth(response.data[0]);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    const fetchEventData = async () => {
      try {
        const response = await fetchEvent(id);

        if (response.status === 200) {
          console.log("Event data collected successfully");
          setEventItem(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchEventData();
    fetchAccountData();
  }, []);

  const removeBookedEventModalDisplaying = useAppSelector(
    state => state.eventsModal.removeBookedEventModalDisplaying
  );

  const removeBookedEventHandler = () => {
    dispatch(modalActions.removeBookedEventModalHandler())
  };

  const confirmRemoveBookedEventHandler = async (confirm: boolean) => {
    if (confirm) {
        try {
            let response;

            if (userAuth) {
              response = await removeBookedEvent(id, userAuth.user_id);
            }

            if (response?.status === 200) {
              setRemoveBookedEventModalMessage(response.data.message);
            }

            setTimeout(() => {
              dispatch(modalActions.removeBookedEventModalHandler());
              navigate('/app/booked-events')
            }, 2000);
            
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            // error is now typed as AxiosError
            setRemoveBookedEventModalMessage(
              error.response?.data?.message || "Unable to remove event"
            );
          } else {
            setRemoveBookedEventModalMessage("Unable to remove event");
          }
        }
    } else {
        dispatch(modalActions.removeBookedEventModalHandler())
    }
  };

  return (
  <div className={classes["booked-event-container"]}>
    {removeBookedEventModalDisplaying && (
      <ConfirmationModal
        confirmAction={confirmRemoveBookedEventHandler}
        message={removeBookedEventModalMessage}
      />
    )}

    <div className={classes["event-header"]}>
      <h1 className={classes["event-title"]}>{name}</h1>
      <h2 className={classes["event-date"]}>{date}</h2>
      <button
        onClick={removeBookedEventHandler}
        className={`${classes["form-btn"]} ${classes["delete-btn"]}`}
      >
        Remove from booked events
      </button>
    </div>

    {/* <Responses bookedEventId={id} /> */}
  </div>
  );

};

export default BookedEventDetails;
