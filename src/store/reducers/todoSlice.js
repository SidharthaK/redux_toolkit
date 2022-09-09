import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoData: null,
  isLoadingTodo: false,
  todoErrors: null,
};

export const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    fetchTodoLoading: (state) => {
      state.isLoadingTodo = true;
    },
    fetchTodoSuccess: (state, action) => {
      state.isLoadingTodo = false;
      state.todoData = [...action.payload];
    },
    fetchTodoFailure: (state) => {
      state.isLoadingTodo = false;
      state.todoErrors = true;
    },
  },
});

export const { fetchTodoLoading, fetchTodoSuccess, fetchTodoFailure } =
  todoSlice.actions;

export const fetchTodoDetails = () => (dispatch) => {
  dispatch(fetchTodoLoading());
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.json())
    .then((res) => {
      dispatch(fetchTodoSuccess(res));
    })
    .catch((res) => {
      dispatch(fetchTodoFailure());
    });
};

export default todoSlice.reducer;
