import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    registries: [],
    registriesCounter: null,
}

export const registriesSlice = createSlice({
    name: 'registry',
    initialState,
    reducers: {
        getRegistriesByOrg: (state, action) => {
            state.requests = action.payload;
        },
        getRegistriesByUser: (state, action) => {
            state.requests = action.payload;
        },
    },
})

export const { getRegistriesByOrg, getRegistriesByUser } = registriesSlice.actions;

export default registriesSlice.reducer;