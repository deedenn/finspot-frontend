import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    organizations: [],
    currentOrganization: null,
}

export const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganization: (state, action) => {
            state.organizations = action.payload;
            state.currentOrganization = action.payload[0];
        },
        setCurrentOrganization: (state, action) => {
            state.currentOrganization = action.payload;
        }
    },
})

export const { setOrganization, setCurrentOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;