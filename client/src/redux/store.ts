import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.ts'
import pollsReducer from './pollsSlice.ts'

const store = configureStore({
    reducer: {
        user: userReducer,
        polls: pollsReducer
    }
})

export default store 