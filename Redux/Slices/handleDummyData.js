import { createSlice } from "@reduxjs/toolkit";
import { dummydata } from "../../utils/dummy";

const initialState = {
  data: dummydata,
 
};

export const handleDummyData = createSlice({
  name: "handleDummyData",
  initialState,
//   reducers: {
//     setIsLogin: (state, action) => {
//       state.isLogin = true;
//       state.user = action.payload;
//     },
//   },
});
export const getdummydata = (state) => state.handleDummyData;
// export const { setIsLogin } = handleDummyData.actions;
export default handleDummyData.reducer;
