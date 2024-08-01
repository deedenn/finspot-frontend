import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openedSidebar: true,
}

export const viewSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        actionSidebar: (state) => {
            state.openedSidebar = !state.openedSidebar;
        }
    },
})


export const { actionSidebar } = viewSlice.actions;

export default viewSlice.reducer;