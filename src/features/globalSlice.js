import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { exampleTableLineService } from "../services/featureStep.service";

// Initial state
const initialState = {
  tableUpdated:{},
  loading: false,
  error: null,
};

// Async thunk for fetching tags
export const exampleTableLineSlice = createAsyncThunk('globalState/exampleTableLine', async (body) => {
   await exampleTableLineService(body); 
});

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    onRunningScenario: async (state, action) => {
      try{
        await exampleTableLineService(action.payload);
      }catch(err){
        console.log('-----error', err)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(exampleTableLineSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exampleTableLineSlice.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(exampleTableLineSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { onRunningScenario } = globalSlice.actions;
export default globalSlice.reducer;
