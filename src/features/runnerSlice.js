import { createSlice, createAsyncThunk, isAction } from '@reduxjs/toolkit';
import {tagRunnerService} from '../services/tagRunner.service';
import { onRunningScenario } from './globalSlice';

// Async thunk for fetching tags
export const fetchRunnerAction = createAsyncThunk('tags/fetchRunner', async ({tag}) => {
  return await tagRunnerService({tag});
});

// Initial state
const initialState = {
  runnerLogs: [],
  logTag:"",
  loading: false,
  error: null,
};

const fetchRunnerFeature = createSlice({
  name: 'fetchRunner',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRunnerAction.pending, (state, action) => {
        state.loading = true;
        state.logTag = action.meta.arg.tag
        state.error = null;
      })
      .addCase(fetchRunnerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.logTag = action.meta.arg.tag
        state.runnerLogs = action.payload.data;
      })
      .addCase(fetchRunnerAction.rejected, (state, action) => {
        state.loading = false;
        state.logTag = ""
        state.error = action.error.message;
      });
  },
});
// export const { updateTagIsActive } = fetchRunnerFeature.actions;
export default fetchRunnerFeature.reducer;
