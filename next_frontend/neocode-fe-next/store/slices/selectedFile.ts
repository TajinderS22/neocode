import { createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type { FileTree } from "../../types";

const selectedFileSlice = createSlice({
  name: "selectedFile",
  initialState: null as FileTree | null,
  reducers: {
    setSelectedFile: (_state, action: PayloadAction<FileTree | null>) => {
      return action.payload;
    },
    clearSelectedFile: () => null,
  },
});

export const { setSelectedFile, clearSelectedFile } = selectedFileSlice.actions;
export default selectedFileSlice.reducer;
