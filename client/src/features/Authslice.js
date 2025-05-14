import { createSlice } from "@reduxjs/toolkit";

const initialState={
  user:null,
  isAuthenticated:false
}

const authSlice= createSlice({
  name:"authSlice",
  initialState,
  reducers:{
    // eg. userLoggedIn({name:"harsh"})
    //{name:"harsh"} it is payload
    userLoggedIn:(state,action)=>{
      state.user=action.payload.user;
      state.isAuthenticated=true
    },
    userLoggedOut:(state)=>{
      state.user=null;
      state.isAuthenticated=false
    }
  }
});

export const {userLoggedIn,userLoggedOut}=authSlice.actions;

export default authSlice.reducer;