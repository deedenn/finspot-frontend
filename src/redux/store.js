import { configureStore } from '@reduxjs/toolkit'
import viewSlice from './slices/viewSlice'

export const store = configureStore({
    reducer: {
        viewSlice
    },
})