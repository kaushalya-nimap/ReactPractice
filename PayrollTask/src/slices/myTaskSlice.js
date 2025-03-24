import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { ADDTASK, MYTASK } from "../services/apiEndpoints";
import { privatePost } from "../services/privateRequest";
import toast from "react-hot-toast";

export const fetchMyTask = createAsyncThunk(
  "get/fetchMyTask",
  async (params) => {
    const res = await privatePost(MYTASK, params);
    return {data:res.data.data,params};
  }
);

export const addTask=createAsyncThunk("post/aaTask",async(params)=>{
  const res=await privatePost(ADDTASK,params)
  toast.success("new task added successfully")
})
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
      state.task = action.payload.data.TaskList;
      state.totalCount = action.payload.data.TotalCount;
      state.lastParams = action.payload.params;
    });
    builder.addCase(fetchMyTask.rejected, (state) => {
      (state.loading = false), (state.error = true);
    });
  },
});

export const { resetFilters, setFilterApplied } = taskSlice.actions;
export default taskSlice.reducer;
