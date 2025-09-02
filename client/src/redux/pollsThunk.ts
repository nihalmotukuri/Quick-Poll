import { createAsyncThunk } from "@reduxjs/toolkit"
import api from '../api/axios.ts'

export const getLatestPolls = createAsyncThunk(
    'pollsSlice/getLatestPolls',
    async () => {
        try {
            const res = await api.get('/polls/latest')
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const getPolls = createAsyncThunk(
    'pollsSlice/getPolls',
    async () => {
        try {
            const res = await api.get('/polls')
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const getPoll = createAsyncThunk(
    'pollsSlice/getPoll',
    async (pollId) => {
        try {
            const res = await api.get(`/polls/${pollId}`)
            return res.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const vote = createAsyncThunk(
    'pollsSlice/vote',
    async ({ pollId, optionId }) => {
        try {
            const res = await api.put(`/polls/${pollId}/vote`, { option_id: optionId })
            return res.data.updated_poll
        } catch (err) {
            console.error(err)
        }
    }
)

export const createPoll = createAsyncThunk(
    'pollsSlice/createPoll',
    async ({ question, options }) => {
        try {
            const res = await api.post('/polls', { question, options })
            // dispatch(getLatestPolls())
            return res.data.new_poll
        } catch (err) {
            console.error(err)
        }
    }
)