import { configureStore } from "@reduxjs/toolkit";
import bookedEventsReducer from "./booked_events_slice";
import eventsReducer from "./events_slice";
import modalReducer from "./event_details_modal_slice";

const store = configureStore({
    reducer: {
        bookedEvents: bookedEventsReducer,
        events: eventsReducer,
        eventsModal: modalReducer
    }
});

export default store