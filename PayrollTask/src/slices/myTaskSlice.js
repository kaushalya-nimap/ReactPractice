import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { MYTASK } from "../services/apiEndpoints";
import { privatePost } from "../services/privateRequest";
import toast from "../shared/toast/Toast";

export const fetchMyTask = createAsyncThunk(
  "get/fetchMyTask",
  async (params) => {
    const res = await privatePost(MYTASK, params);
    return res.data.data;
  }
);
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    task: [],
    totalCount: 0,
    loading: false,
    error: false,
    lastParams: {},
    filterApplied: false,
  },
  reducers: {
    resetFilters: (state) => {
      state.lastParams = {};
    },
    setFilterApplied: (state, action) => {
        state.filterApplied = action.payload; 
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchMyTask.fulfilled, (state, action) => {
      state.loading = false
      state.task = action.payload.TaskList;
      state.totalCount = action.payload.TotalCount;
      state.lastParams = action.payload.params;
    });
    builder.addCase(fetchMyTask.rejected, (state) => {
      (state.loading = false), (state.error = true);
    });
  },
});

export const { resetFilters, setFilterApplied } = taskSlice.actions;
export default taskSlice.reducer;
