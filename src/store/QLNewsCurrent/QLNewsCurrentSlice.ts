import { tableQLNewsData } from "@/interface/QLNews/QLNews";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface currentQLNews
{
    news?: tableQLNewsData | null
}
const initialState = {
    news: null
}  as currentQLNews


const QLNewsCurrentSlice = createSlice( {
    name: "currentQLNews",
    initialState: initialState,
    reducers: {
        setCurrent(state,  action: PayloadAction<tableQLNewsData>)
        {
            state.news = action.payload;
        }
    }
} )
export const { setCurrent } = QLNewsCurrentSlice.actions;
export default QLNewsCurrentSlice.reducer;
