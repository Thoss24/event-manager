import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  deleteEventDetailsModalDisplaying: boolean;
  bookEventModalDisplaying: boolean;
  removeBookedEventModalDisplaying: boolean;
  notificationsModalDisplaying: boolean;
}

const initialState: ModalState = {
  deleteEventDetailsModalDisplaying: false,
  bookEventModalDisplaying: false,
  removeBookedEventModalDisplaying: false,
  notificationsModalDisplaying: false
};

const modalSlice = createSlice({
  name: "event-modal-slice",
  initialState,
  reducers: {
    eventDetailsModalHandler(state) {
      state.deleteEventDetailsModalDisplaying = !state.deleteEventDetailsModalDisplaying;
    },
    bookEventModalHandler(state) {
      state.bookEventModalDisplaying = !state.bookEventModalDisplaying;
    },
    removeBookedEventModalHandler(state) {
      state.removeBookedEventModalDisplaying = !state.removeBookedEventModalDisplaying;
    },
    notificationsModalHandler(state) {
      state.notificationsModalDisplaying = !state.notificationsModalDisplaying;
    }
  }
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
