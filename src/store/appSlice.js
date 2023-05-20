import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    studentData: {},
  },
  reducers: {
    addStudentData(state, actions) {
      state.studentData = actions.payload;
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice;
