import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/tasks/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});
export default store;
