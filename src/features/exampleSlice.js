import { createSlice } from '@reduxjs/toolkit';

import exampleMock from './../mock/example.json'
const initialState = {
  rows: exampleMock.rows,
  columns: exampleMock.columns
};

const exampleSlice = createSlice({
  name: 'exampleList',
  initialState,
  reducers: {
    getTags: ()=>{
      
    },
    addNewTask: (state) => {
      state.rows.push({
        id: state.rows.length + 1,
        col1: "",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",
        col7: ""
      });
    },
  },
});

export const { addNewTask } = exampleSlice.actions;

export default exampleSlice.reducer;
