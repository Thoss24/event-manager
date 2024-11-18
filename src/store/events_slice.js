import { createSlice } from "@reduxjs/toolkit";

const defaultEventsState = {
    events: []
};

const eventsSlice = createSlice({
    name: 'events-slice',
    initialState: defaultEventsState,
    reducers: {
        addEvent(state, action) {
            const existingEventItemIndex = state.events.findIndex(event => event.name === action.payload.name);

            if (existingEventItemIndex) {
                alert("An event with this name already exists.")
            } else {
                state.events.push(action.payload)
            };
        },
        removeEvent(state, action) {
            const existingEventItemIndex = state.events.findIndex(event => event.name === action.payload.name);

            const existingEventItem = state.events[existingEventItemIndex];

            if (existingEventItem) {
                state.events.splice(existingEventItemIndex, 1)
            };
        },
        replaceEvents(state, action) {
            if (action.payload === null) {
                state.events = state.bookedEvents;
              } else {
                state.events = action.payload;
                console.log(state.events)
            };
        },
    }
});

export const eventsActions = eventsSlice.actions
export default eventsSlice.reducer;