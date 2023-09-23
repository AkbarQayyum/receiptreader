import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosinstance";

const initialState = {
  isLogin: false,
  user: {},
  friends: [],
  status: "idle",
};

export const getFriendList = createAsyncThunk("getfriend", async ({ id }) => {
  
  let res = await axiosInstance.post(`/friend/getuserfriendlist/`, {
    id: id,
  });
  return res.data;
});

export const UserSessionSlice = createSlice({
  name: "UserSessionSlice",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
      state.friends = action.payload.friends;
    },
    setIsLogout: (state, action) => {
      state.isLogin = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendList.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getFriendList.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(getFriendList.rejected, (state) => {
        state.status = "rejected";
      });
  },
});
export const getLoginProps = (state) => state.UserSessionSlice;
export const { setIsLogin, setIsLogout } = UserSessionSlice.actions;
export default UserSessionSlice.reducer;
