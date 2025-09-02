import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../api/axios.ts'
import { clearUserState } from "./userSlice.ts";
import { clearPollsState } from "./pollsSlice.ts";

export const registerUser = createAsyncThunk(
    'userSlice/registerUser',
    async (newUser, { rejectWithValue }) => {
        try {
            const res = await api.post('/register', newUser)
            console.log(res.data)
            return res.data
        } catch (err) {
            rejectWithValue(err.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'userSlice/loginUser',
    async (userCred, { rejectWithValue }) => {
        try {
            const res = await api.post('/login', userCred)
            console.log(res.data)
            return res.data
        } catch (err) {
            rejectWithValue(err.response.data)
        }
    }
)

export const getUser = createAsyncThunk(
    'userSlice/getUser',
    async () => {
        try {
            const res = await api.get('/get_user')
            console.log('here', res.data)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const logoutUser = createAsyncThunk(
    'userSlice/logoutUser',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.post('/logout')
            dispatch(clearUserState())
            dispatch(clearPollsState())
            return res.data
        } catch (err) {
            rejectWithValue(err.response.data)
        }
    }
)