import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './features/exampleSlice';
import tagsReducer from './features/tagsSlice';
import featureStepReducer from './features/featureStepSlice'
import globalSlice from './features/globalSlice';

const store = configureStore({
  reducer: {
    exampleList: exampleSlice,
    tags: tagsReducer,
    featureStep: featureStepReducer,
    globalState: globalSlice
  },
});

export default store;
