import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    replaceAuth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state) => {
            state.replaceAuth = !initialState.replaceAuth
        }
    },
})

export const { setUser, setAuth } = userSlice.actions;

export default userSlice.reducer;