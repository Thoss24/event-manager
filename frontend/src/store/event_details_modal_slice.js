import { createSlice } from "@reduxjs/toolkit";

const defaultModalState = {
    eventDetailsModalDisplaying: true,
};

const modalSlice = createSlice({
    name: 'event-modal-slice',
    initialState: defaultModalState,
    reducers: {
        showEventDetailsModal(state, action) {
           state.eventDetailsModalDisplaying = true
        },
        hideEventDetailsModal(state, action) {
           state.eventDetailsModalDisplaying = false
        },
    }
});

export const modalActions = modalSlice.actions
export default modalSlice.reducer;