import { configureStore } from "@reduxjs/toolkit";
import selectedFileReducer from "./slices/selectedFile"


export const store= configureStore({
    reducer:{
        selectedFile:selectedFileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
