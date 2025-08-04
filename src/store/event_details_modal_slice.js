import { createSlice } from "@reduxjs/toolkit";

const defaultModalState = {
    deleteEventDetailsModalDisplaying: false,
    bookEventModalDisplaying: false,
    removeBookedEventModalDisplaying: false,
    notificationsModalDisplaying: false
};

const modalSlice = createSlice({
    name: 'event-modal-slice',
    initialState: defaultModalState,
    reducers: {
        eventDetailsModalHandler(state, action) {
           state.deleteEventDetailsModalDisplaying = !state.deleteEventDetailsModalDisplaying
        },
        bookEventModalHandler(state, action) {
            
            state.bookEventModalDisplaying = !state.bookEventModalDisplaying
        },
        removeBookedEventModalHandler(state, action) {
            state.removeBookedEventModalDisplaying = !state.removeBookedEventModalDisplaying
        },
        notificationsModalHandler(state, action) {
            state.notificationsModalDisplaying = !state.notificationsModalDisplaying
        },
    }
});

export const modalActions = modalSlice.actions
export default modalSlice.reducer;