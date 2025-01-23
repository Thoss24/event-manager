import { createSlice } from "@reduxjs/toolkit";

const defaultModalState = {
    deleteEventDetailsModalDisplaying: false,
    bookEventModalDisplaying: false
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
    }
});

export const modalActions = modalSlice.actions
export default modalSlice.reducer;