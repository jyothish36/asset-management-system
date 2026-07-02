import { createSlice } from "@reduxjs/toolkit";

const assetSlice = createSlice({
  name: "assets",
  initialState: [],
  reducers: {
    setAssets: (state, action) => action.payload,
  },
});

export const { setAssets } = assetSlice.actions;
export default assetSlice.reducer;