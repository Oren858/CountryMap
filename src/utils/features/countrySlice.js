import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCountry: {},
};

const countriesSlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
});

export const { setSelectedCountry } = countriesSlice.actions;
export default countriesSlice.reducer;
