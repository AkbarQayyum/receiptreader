import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";

const initialState = {
  read: [],
  unread: [],
  readcount: 0,
  unreadcount: 0,
  status: "idle",
};

export const getnotifications = createAsyncThunk("getnoti", async ({ id }) => {
  console.log(id);
  let res = await axiosInstance.get(`/notifications/${id}`);
  console.log(res.data);
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
      })
      .addCase(getnotifications.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const getNotificationData = (state) => state.NotificationSlice;

export default NotificationSlice.reducer;
