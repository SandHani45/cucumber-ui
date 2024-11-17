import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {tagsService} from '../services/tags.service';

// Async thunk for fetching tags
export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const response = await tagsService();
  return response;
});

// Initial state
const initialState = {
  tags: [],
  loading: false,
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    updateTagIsActive: (state, action) => {
        state.tags = state.tags.map(tag => 
            tag.id === action.payload ? { ...tag, isActive: true } : tag
          );
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { updateTagIsActive } = tagsSlice.actions;
export default tagsSlice.reducer;
