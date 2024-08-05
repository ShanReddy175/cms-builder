import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show : false,
    currentElement: null,
    currentColumn: null,
    currentSection: null,
    pageX: 0,
    pageY: 0
};
export const rulerSlice = createSlice({
    name: 'ElementRuler',
    initialState,
    reducers: {
        showRuler:(state, action)=>{
            const thisAction = action.payload;
            state.show = thisAction.show
            state.currentElement = thisAction.currentElement
            state.currentColumn = thisAction.currentColumn
            state.currentSection = thisAction.currentSection
            state.pageX = thisAction.pageX
            state.pageY = thisAction.pageY
        }
    }
})

export const {showRuler} = rulerSlice.actions;
export default rulerSlice.reducer;