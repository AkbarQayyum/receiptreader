import { configureStore } from "@reduxjs/toolkit";
import UserSessionSlice from "./Slices/UserSessionSlice";
import handleDummyData from "./Slices/handleDummyData";

const store = configureStore({
  reducer: {
    UserSessionSlice: UserSessionSlice,
    handleDummyData: handleDummyData,
  },
});
export default store;
