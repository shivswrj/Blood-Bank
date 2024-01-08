import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userSignup } from "./authAction";

const token = () => {
  if(localStorage.getItem("token")){
   return localStorage.getItem("token") 
  }
  else{
    return null;
  }
}
const initialState = {
  loading: false,
  user: null,
  token: token,
  error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

      // login user
      builder.addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        state.token = payload.token;
      });
      builder.addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });


      // Signup user
      builder.addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(userSignup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        
      });
      builder.addCase(userSignup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });



      // current user
      builder.addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user;
        
      });
      builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    },
      
      
});


export default authSlice;
