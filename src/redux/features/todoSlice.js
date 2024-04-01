import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};
const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      if (state.todos.length === 0) {
        state.todos.push({ id: 1, ...payload });
      } else {
        const lastElement = state.todos.at(-1);
        state.todos.push({
          id: lastElement.id + 1,
          status: "pending",
          ...payload,
        });
      }
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
