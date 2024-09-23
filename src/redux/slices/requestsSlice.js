import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    requests: [],
}

export const requestsSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        getRequestsByOrg: (state, action) => {
            console.log(action.payload);

            state.requests = action.payload;
        }
    },
})

export const { getRequestsByOrg } = requestsSlice.actions;

export default requestsSlice.reducer;