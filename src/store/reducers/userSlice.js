import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLoading: false,
  errors: false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    fetchUsersDetailsLoading: (state) => {
      state.isLoading = true;
    },
    fetchUserDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.data = [...action.payload];
    },
    fetchUserDetailsFailure: (state) => {
      state.isLoading = false;
      state.errors = true;
    },
    AddUser: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const {
  fetchUsersDetailsLoading,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  AddUser,
} = userSlice.actions;

export const fetchUserDetails = () => (dispatch) => {
  dispatch(fetchUsersDetailsLoading());
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((res) => {
      dispatch(fetchUserDetailsSuccess(res));
    })
    .catch((res) => {
      dispatch(fetchUserDetailsFailure());
    });
};

export default userSlice.reducer;
