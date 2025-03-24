import { configureStore } from "@reduxjs/toolkit";
import myTask from "./slices/myTaskSlice";
export const store=configureStore({
    reducer:{
        myTask
    }
})
export default store