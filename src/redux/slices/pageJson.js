import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page:{
        header:{},
        body:{},
        footer:{}
    }
}

export const pageJsonSlice = createSlice({
    name: 'PageJson',
    initialState,
    reducers: {
        setPageJson: (state, action)=>{
            const thisAction = action.payload;
            state.page = thisAction.page
        }
    }
})

export const {setPageJson} = pageJsonSlice.actions;
export default pageJsonSlice.reducer;