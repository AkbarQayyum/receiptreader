import { configureStore } from "@reduxjs/toolkit";
import UserSessionSlice from "./Slices/UserSessionSlice";

const store = configureStore({
  reducer: {
    UserSessionSlice: UserSessionSlice,
  },
});
export default store;
