
import React from "react";
import removeBookedEvent from "../../../utility/events_actions/remove-booked-event";
import classes from "./BookedEvents.module.css";
import { useAppDispatch, useAppSelector } from "../../../types/hooks";
import { modalActions } from "../../../store/event_details_modal_slice";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { useState, useEffect } from "react";
import checkAccountType from "../../../utility/authentication/check_account_type";
import Responses from "../../utility_components/Responses";
import { fetchEvent } from "../../../utility/events_actions/fetch-event-data";
import { useParams } from "react-router-dom";
import { BookedEventDetailsProps } from "../../../types/Events";

const BookedEventDetails = ({id, name, date}: BookedEventDetailsProps) => {

  const dispatch = useAppDispatch();
  const [userAuth, setUserAuth] = useState();
  const [eventItem, setEventItem] = useState();
  const [removeBookedEventModalMessage, setRemoveBookedEventModalMessage] = useState<string>("Are you sure you want to remove this event from your booked events?")

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

  const confirmRemoveBookedEventHandler = async (confirm) => {
    if (confirm) {
        try {
            const response = await removeBookedEvent(id, userAuth.user_id); // booked event id + user id

            if (response.status === 200) {
              setRemoveBookedEventModalMessage(response.data)
            }

            setTimeout(() => {
              dispatch(modalActions.removeBookedEventModalHandler());
              window.location.href = "http://localhost:3000/"
            }, 2000);
            
        } catch (error) {
          setRemoveBookedEventModalMessage(error.response ? error.response.data : "Unable to remove event");
        }
    } else {
        dispatch(modalActions.removeBookedEventModalHandler())
    }
  };

  return (
    <div>
      {removeBookedEventModalDisplaying && (
        <ConfirmationModal
          confirmAction={confirmRemoveBookedEventHandler}
          message={removeBookedEventModalMessage}
        />
      )}
      <div>
        <h1>{name}</h1>
        <h1>{date}</h1>
        <button onClick={removeBookedEventHandler}>Delete</button>
      </div>
      <Responses bookedEventId={id} />
    </div>
  );

};

export default BookedEventDetails;
