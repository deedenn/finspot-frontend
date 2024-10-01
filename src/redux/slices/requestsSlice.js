import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    requests: [],
    requestsCounter: null,
}

export const requestsSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        getRequestsByOrg: (state, action) => {
            state.requests = action.payload;
        },
        getRequestsByUser: (state, action) => {
            state.requests = action.payload;
        },
    },
})

export const { getRequestsByOrg, getRequestsByUser } = requestsSlice.actions;

export default requestsSlice.reducer;