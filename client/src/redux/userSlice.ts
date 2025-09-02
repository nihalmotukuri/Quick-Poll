import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, getUser, logoutUser } from "./userThunk";

const initialState = {
    userData: null,
    userLoading: true,
    signingin: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearUserState: (state) => {
            Object.assign(state, initialState)
        }
    },
    extraReducers: (builder) => (
        builder
            .addCase(registerUser.pending, (state) => {
                state.signingin = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userData = action.payload.user
                state.signingin = false
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.signingin = false
                state.error = action.error.message
            })
            .addCase(loginUser.pending, (state) => {
                state.signingin = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userData = action.payload.user
                state.signingin = false
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.signingin = false
                state.error = action.error.message
            })
            .addCase(getUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.userData = action.payload
                state.userLoading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                state.userLoading = false
                state.error = action.error.message
            })
            .addCase(logoutUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.userData = null
                state.userLoading = false
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.userLoading = false
                state.error = action.error.message
            })
    )
})

export const { clearUserState } = userSlice.actions
export default userSlice.reducer