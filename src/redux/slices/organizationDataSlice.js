import { getOrganizationData } from '@reduxjs/toolkit'

const initialState = {
    openedSidebar: true,
    headerTitle: 'Заявки',
}

// дописать
export const organizationDataSlice = getOrganizationData({
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

export default organizationDataSlice.reducer;