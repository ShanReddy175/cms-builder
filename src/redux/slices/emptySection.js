import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    show: false,
    currentSection: null,
    position: 'bottom',
    obj: {}
}

export const emptySectionSlice = createSlice({
    name: 'EmptySlice',
    initialState,
    reducers: {
        showEmptySectionScreen: (state, action) =>{
            const thisAction = action.payload;
            state.show = thisAction.show;
            state.currentSection = thisAction.currentSection;
            state.position = thisAction.position;
            state.obj = thisAction.obj
        }
    }
})

export const {showEmptySectionScreen} = emptySectionSlice.actions;

export default emptySectionSlice.reducer;