import { createSlice, current } from "@reduxjs/toolkit";

const defaultBookedEventsState = {
  bookedEvents: [],
  numberOfBookedEvents: 0,
};

const bookedEventsSlice = createSlice({
  name: "booked-events",
  initialState: defaultBookedEventsState,
  reducers: {
    replaceBookedEvents(state, action) {
      if (action.payload === null) {
        state.bookedEvents = [...state.bookedEvents]
      } else {
        state.bookedEvents = action.payload;
        console.log(current(state))
      }
    },
    addEvent(state, action) {

      const existingBookedEventIndex = state.bookedEvents.findIndex(
        (event) => event.name === action.payload.name
      );

      const existingCartItem = state.bookedEvents[existingBookedEventIndex];

      if (existingCartItem) {
        alert("This event has already been booked")
      } else {
        state.bookedEvents.push(action.payload)
      };
    },
    removeEvent(state, action) {

      const existingBookedEventIndex = state.bookedEvents.findIndex(
        (event) => event.name === action.payload.name
      );

      state.bookedEvents.splice(existingBookedEventIndex, 1);
    },
  },
});

export const bookedEventsActions = bookedEventsSlice.actions;
export default bookedEventsSlice.reducer;
