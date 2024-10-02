import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    smallSidebar: true,
    closedSidebar: true,
    headerTitle: 'Заявки',
}

export const viewSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        actionSidebar: (state) => {
            state.smallSidebar = !state.smallSidebar;
        },
        closeSidebar: (state) => {
            state.closedSidebar = !state.closedSidebar;
        },
        setHeaderTitle: (state, action) => {
            state.headerTitle = action.payload;
        }
    },
})

export const { actionSidebar, closeSidebar, setHeaderTitle } = viewSlice.actions;

export default viewSlice.reducer;