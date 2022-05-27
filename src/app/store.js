import { configureStore } from "@reduxjs/toolkit";
import useReducer from '../features/userSlice';

export default configureStore({
    reducer:{
        user: useReducer,
    }
})

export const LOGIN_USER = "LOGIN_USER";