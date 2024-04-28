import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: null,
    error: false
}

export const Films = createSlice({
    name: "Films",
    initialState,

    reducers: {
        FETCH_START: (draft) =>{
            draft.loading = true;
        },
        
        FETCH_SUCCES: (draft, action) =>{
            draft.data = action.payload;
            draft.loading = false;
        },

        FETCH_FAILURE: (draft) =>{
            draft.error = true;
            draft.loading = false;
        },
        
    }
})

export const { FETCH_START, FETCH_SUCCES, FETCH_FAILURE } = Films.actions;
export default Films.reducer;