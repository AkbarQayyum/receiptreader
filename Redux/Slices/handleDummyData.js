import { createSlice } from "@reduxjs/toolkit";
import { dummydata } from "../../utils/dummy";

const initialState = {
  data: dummydata,
 
};

export const handleDummyData = createSlice({
  name: "handleDummyData",
  initialState,
  reducers: {
    AddField: (state, action) => {
     let val   = JSON.parse(JSON.stringify(state.data))
     console.log(action.payload)
     val = {...val,[action.payload.title]:action.payload.value}
     console.log(val)
     state.data = val
    },
  },
});
export const getdummydata = (state) => state.handleDummyData;
export const { AddField } = handleDummyData.actions;
export default handleDummyData.reducer;
