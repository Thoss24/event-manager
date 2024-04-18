import { configureStore } from "@reduxjs/toolkit";
import bookedEventsReducer from "./booked_events_slice";
import eventsReducer from "./events_slice";

const store = configureStore({
    reducer: {
        bookedEvents: bookedEventsReducer,
        events: eventsReducer
    }
});

export default store