import { configureStore } from "@reduxjs/toolkit";
import UserSessionSlice from "./Slices/UserSessionSlice";
import handleDummyData from "./Slices/handleDummyData";
import NotificationSlice from "./Slices/NotificationSlice";

const store = configureStore({
  reducer: {
    UserSessionSlice: UserSessionSlice,
    handleDummyData: handleDummyData,
    NotificationSlice: NotificationSlice,
  },
});
export default store;
