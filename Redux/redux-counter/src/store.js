import { configureStore } from "@reduxjs/toolkit";
import counter from './slice/CounterSlice'
import user from './slice/UserSlice'
export const store=configureStore({
    reducer:{
        counter:counter,
        user:user
    }
})
export default store