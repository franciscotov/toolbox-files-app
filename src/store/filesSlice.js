import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFiles } from '../services/filesService';

export const fetchFiles = createAsyncThunk(
  'files/fetchFiles',
  async (fileName, thunkAPI) => {
    try {
      return await getFiles(fileName);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data.message || error?.message || 'Failed to fetch files');
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFiles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || 'Failed to load files';
      });
  },
});

export const selectFiles = (state) => state.files.items;
export const selectFilesLoading = (state) => state.files.loading;
export const selectFilesError = (state) => state.files.error;

export default filesSlice.reducer;
