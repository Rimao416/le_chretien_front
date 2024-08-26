import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config";
API.defaults.withCredentials = true;

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await API.get("livres");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
});

let bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          books: action.payload,
          loading: false,
          error: false,
        };
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      });
  },
});

export default bookSlice.reducer;
