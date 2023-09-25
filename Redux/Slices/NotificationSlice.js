import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";

const initialState = {
  read: [],
  unread: [],
  readcount: 0,
  unreadcount: 0,
  status: "idle",
  data: [],
};

export const getnotifications = createAsyncThunk("getnoti", async ({ id }) => {
  let res = await axiosInstance.get(`/notifications/${id}`);

  return res.data;
});

export const NotificationSlice = createSlice({
  name: "NotificationSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getnotifications.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getnotifications.fulfilled, (state, action) => {
        state.read = action.payload.read;
        state.unread = action.payload.unread;
        state.readcount = action.payload.readcount;
        state.unreadcount = action.payload.unreadcount;
        state.status = "success";
        state.data = [...action.payload.read, ...action.payload.unread];
      })
      .addCase(getnotifications.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const getNotificationData = (state) => state.NotificationSlice;

export default NotificationSlice.reducer;
