import { createSlice } from "@reduxjs/toolkit";

const defaultModalState = {
    deleteEventDetailsModalDisplaying: false,
    bookEventModalDisplaying: false,
    removeBookedEventModalDisplaying: false,
    notificationsModal: false
};

const modalSlice = createSlice({
    name: 'event-modal-slice',
    initialState: defaultModalState,
    reducers: {
        showEventDetailsModal(state, action) {
           state.deleteEventDetailsModalDisplaying = true
        },
        hideEventDetailsModal(state, action) {
           state.deleteEventDetailsModalDisplaying = false
        },
        showBookEventModal(state, action) {
            state.bookEventModalDisplaying = true
        },
        hideBookEventModal(state, action) {
            state.bookEventModalDisplaying = false
        },
        showRemoveBookedEventModal(state, action) {
            state.removeBookedEventModalDisplaying = true
        },
        hideRemoveBookedEventModal(state, action) {
            state.removeBookedEventModalDisplaying = false
        },
        showNotificationsModal(state, action) {
            state.notificationsModal = !state.notificationsModal
        },
    }
});

export const modalActions = modalSlice.actions
export default modalSlice.reducer;