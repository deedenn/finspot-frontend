import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openedSidebar: true,
    headerTitle: 'Заявки',
}

export const viewSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        actionSidebar: (state) => {
            state.openedSidebar = !state.openedSidebar;
        },
        setHeaderTitle: (state, action) => {
            state.headerTitle = action.payload;
        }
    },
})


export const { actionSidebar, setHeaderTitle } = viewSlice.actions;

export default viewSlice.reducer;