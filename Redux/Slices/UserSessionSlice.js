import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  user: {},
};

export const UserSessionSlice = createSlice({
  name: "UserSessionSlice",
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    setIsLogout: (state, action) => {
      state.isLogin = false;
      state.user ={};
    },
  },
});
export const getLoginProps = (state) => state.UserSessionSlice;
export const { setIsLogin, setIsLogout } = UserSessionSlice.actions;
export default UserSessionSlice.reducer;
