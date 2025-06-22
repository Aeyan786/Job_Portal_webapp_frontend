import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    singleJob: null,
    resetAllJobs: [],
    allAdminJobs: [],
    adminSingleJob: null,
    searchJobBytext: "",
    getAppliedJobs: [],
    browseJobs: [],
    searchQuery: "",
  },
  reducers: {
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setResetAllJobs: (state, action) => {
      state.resetAllJobs = action.payload;
    },
    setallAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobBytext: (state, action) => {
      state.searchJobBytext = action.payload;
    },
    setAdminSingleJob: (state, action) => {
      state.adminSingleJob = action.payload;
    },
    setGetAppliedJobs: (state, action) => {
      state.getAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setBrowsejobs: (state, action) => {
      state.browseJobs = action.payload;
    },
  },
});

export const {
  setallAdminJobs,
  setSingleJob,
  setResetAllJobs,
  setSearchJobBytext,
  setAdminSingleJob,
  setGetAppliedJobs,
  setSearchQuery,
  setBrowsejobs,
} = jobSlice.actions;
export default jobSlice.reducer;
