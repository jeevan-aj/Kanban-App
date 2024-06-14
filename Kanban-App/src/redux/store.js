import { configureStore ,combineReducers } from '@reduxjs/toolkit'
import {initialSlice} from './InitialSlices'



export const store = configureStore({
   reducer: combineReducers({
      initialSlice:initialSlice.reducer
    })
})