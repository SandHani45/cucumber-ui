import { createSlice, createAsyncThunk, isAction } from '@reduxjs/toolkit';
import {featureStepService} from '../services/featureStep.service';
import mapTagsFeaturesScenarios from '../utill/mapTagsFeaturesScenarios';

// Async thunk for fetching tags
export const fetchFeatureStepSlice = createAsyncThunk('tags/fetchFeatureSteps', async (body) => {
  return await featureStepService(body);
});

// Initial state
const initialState = {
  featureStep: [],
  tagsList:[],
  mapTagsFeaturesScenariosData: [],
  loading: false,
  error: null,
};

const featureStepSlice = createSlice({
  name: 'featureStep',
  initialState,
  reducers: {
    updateTagIsActive: (state, action) => {
      state.tagsList = state.tagsList.map(tag => 
          tag.id === action.payload ? { ...tag, isActive: !tag.isActive } : tag
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeatureStepSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeatureStepSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.featureStep = action.payload;
        state.tagsList =  action.payload?.TagLine?.map((tags)=>{
          return {
            ...tags, isAction: false
          }
        })
        state.mapTagsFeaturesScenariosData = mapTagsFeaturesScenarios(action.payload)
      })
      .addCase(fetchFeatureStepSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { updateTagIsActive } = featureStepSlice.actions;
export default featureStepSlice.reducer;
