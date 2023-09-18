import { createSlice } from "@reduxjs/toolkit";
import { dummydata } from "../../utils/dummy";

const initialState = {
  data: {},
};

export const handleDummyData = createSlice({
  name: "handleDummyData",
  initialState,
  reducers: {
    AddField: (state, action) => {
      console.log(action.payload)
      let val = JSON.parse(JSON.stringify(state.data));

      val = { ...val, [action.payload.title]: action.payload.value };

      state.data = val;
    },
    addapidata: (state, action) => {
   
      state.data = { ...state?.data, ...action?.payload };
    },
    handleReset: (state, action) => {
      state.data = dummydata;
    },
  },
});
export const getdummydata = (state) => state.handleDummyData;
export const { AddField, handleReset, addapidata } = handleDummyData.actions;
export default handleDummyData.reducer;
