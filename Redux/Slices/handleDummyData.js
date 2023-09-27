import { createSlice } from "@reduxjs/toolkit";
import { dummydata } from "../../utils/dummy";

const initialState = {
  data: {},
  newlyaddfield: {},
};

export const handleDummyData = createSlice({
  name: "handleDummyData",
  initialState,
  reducers: {
    AddField: (state, action) => {
      let val = JSON.parse(JSON.stringify(state.newlyaddfield));

      val = { ...val, [action.payload.title]: action.payload.value };
      state.newlyaddfield = val;
      // if (!isNaN(action.payload.value))
      //   state.data["SUBTOTAL"] = (
      //     +state.data["SUBTOTAL"] + +action.payload.value
      //   ).toString();
      // state.data["TOTAL"] = (
      //   +state.data["TOTAL"] + +action.payload.value
      // ).toString();
    },
    addapidata: (state, action) => {
      state.data = { ...state?.data, ...action?.payload };
    },
    updatedata: (state, action) => {
      state.data = action.payload.data;
    },
    handleReset: (state, action) => {
      state.data = dummydata;
      state.newlyaddfield = {};
    },
  },
});
export const getdummydata = (state) => state.handleDummyData;
export const { AddField, handleReset, addapidata, updatedata } =
  handleDummyData.actions;
export default handleDummyData.reducer;
