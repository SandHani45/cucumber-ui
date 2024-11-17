import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isScenarioRunning: false,
  runningScenario: "",
  runningTag: "",
  loading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "globalState",
  initialState,
  reducers: {
    onRunningScenario: (state, action) => {
      if (state.isScenarioRunning) {
        state.isScenarioRunning = !state.isScenarioRunning;
        state.runningScenario = "";
        state.runningScenario = "";
        state.runningTag = "";
      } else {
        state.isScenarioRunning = true;
        state.runningScenario = action.payload?.scenarioId;
        state.runningTag = action.payload?.tag;
      }
    },
  },
});
export const { onRunningScenario } = globalSlice.actions;
export default globalSlice.reducer;
