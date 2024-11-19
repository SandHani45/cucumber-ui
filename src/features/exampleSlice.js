import { createSlice } from '@reduxjs/toolkit';

import exampleMock from './../mock/example.json'
const initialState = {
  exampleUpdate: [],
  addExample: []
};

// "data": [
// 		{
// 			"lineNumber": 26.1,
// 			"data": [
// 				"shaik",
// 				"hello"
// 			]
// 		},
// 			{
// 			"lineNumber": 26.2,
// 			"data": [
// 				"shaik",
// 				"hello"
// 			]
// 		}
// 	],
const exampleSlice = createSlice({
  name: 'exampleList',
  initialState,
  reducers: {
    onExampleUpdate: (state, action)=> {
      state.exampleUpdate = action.payload
    },
    onAddExample: (state, action)=> {
      state.addExample = []
      state.addExample = action.payload
      console.log('--------state.addExample', )
    }
  },
});

export const { onAddExample, onExampleUpdate } = exampleSlice.actions;

export default exampleSlice.reducer;
