import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchusers = createAsyncThunk("get/fetchUsers", async () => {
    const response=await axios.get("https://jsonplaceholder.typicode.com/users")
    return {users:response.data}
});
const userSlice=createSlice({
    name:"users",
    initialState:{
        users:[],
        loading:false,
        error:false
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchusers.pending,(state)=>{
            state.loading=true
            state.error=false
        })
        builder.addCase(fetchusers.fulfilled,(state,action)=>{
            state.loading=false,
            state.users=action.payload.users
            console.log(state.users)
        })
        builder.addCase(fetchusers.rejected,(state)=>{
            state.loading=false,
            state.error=true
        })
    }
})

export default userSlice.reducer

