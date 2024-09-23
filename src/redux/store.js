import { configureStore } from '@reduxjs/toolkit'
import viewSlice from './slices/viewSlice';
import userSlice from './slices/userSlice';
import organizationSlice from './slices/organizationSlice';
import requestsSlice from './slices/requestsSlice';

export const store = configureStore({
    reducer: {
        viewSlice,
        userSlice,
        organizationSlice,
        requestsSlice,
    },
})