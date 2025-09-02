import { createSlice } from "@reduxjs/toolkit"
import { getLatestPolls, getPolls, getPoll, vote, createPoll } from "./pollsThunk.ts"

const initialState = {
    latestPollsList: null,
    pollsList: null,
    poll: null,
    latestPollsLoading: true,
    pollsLoading: true,
    pollLoading: false,
    error: null
}

const pollsSlice = createSlice({
    name: "polls",
    initialState,
    reducers: {
        clearPollsState: (state) => {
            Object.assign(state, initialState)
        },
        setPoll: (state, action) => {
            state.poll = action.payload
        }
    },
    extraReducers: (builder) => (
        builder
            .addCase(getLatestPolls.pending, (state) => {
                state.latestPollsLoading = true
            })
            .addCase(getLatestPolls.fulfilled, (state, action) => {
                state.latestPollsList = action.payload
                state.latestPollsLoading = false
            })
            .addCase(getLatestPolls.rejected, (state, action) => {
                state.latestPollsLoading = false
                state.error = action.error.message
            })
            .addCase(getPolls.pending, (state) => {
                state.pollsLoading = true
            })
            .addCase(getPolls.fulfilled, (state, action) => {
                state.pollsList = action.payload
                state.pollsLoading = false
            })
            .addCase(getPolls.rejected, (state, action) => {
                state.pollsLoading = false
                state.error = action.error.message
            })
            .addCase(getPoll.pending, (state) => {
                state.pollLoading = true
            })
            .addCase(getPoll.fulfilled, (state, action) => {
                state.poll = action.payload
                state.pollLoading = false
            })
            .addCase(getPoll.rejected, (state, action) => {
                state.pollLoading = false
                state.error = action.error.message
            })
            .addCase(vote.pending, (state) => {
                state.pollLoading = true
            })
            .addCase(vote.fulfilled, (state, action) => {
                state.poll = action.payload
                state.pollLoading = false
            })
            .addCase(vote.rejected, (state, action) => {
                state.pollLoading = false
                state.error = action.error.message
            })
            .addCase(createPoll.pending, (state) => {
                state.pollsLoading = true
            })
            .addCase(createPoll.fulfilled, (state, action) => {
                if (!state.latestPollsList) {
                    state.pollsList = [action.payload]
                    state.latestPollsList = [action.payload]
                } else if (!state.pollsList) {
                    state.pollsList = [action.payload]
                    state.latestPollsList.unshift(action.payload)
                } else {
                    state.pollsList.unshift(action.payload)
                    state.latestPollsList.unshift(action.payload)
                }
                state.pollsLoading = false
            })
            .addCase(createPoll.rejected, (state, action) => {
                state.pollsLoading = false
                state.error = action.error.message
            })
    )
})

export const { clearPollsState, setPoll } = pollsSlice.actions
export default pollsSlice.reducer