import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./event_details_modal_slice";

const store = configureStore({
    reducer: {
        eventsModal: modalReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;