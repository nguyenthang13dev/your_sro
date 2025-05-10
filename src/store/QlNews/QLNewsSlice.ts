import { QLNewsGroup } from "@/interface/QLNews/QLNews";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsGroupState {
    newsGroups: QLNewsGroup[];
}
const initialState = {
    newsGroups: []
} as NewsGroupState

export const QLNewsSlice = createSlice( {
    name: "QLnewsGroup",
    initialState: initialState,
    reducers: {
        setNewsGroup(state, action: PayloadAction<QLNewsGroup[]>)
        {
            state.newsGroups = action.payload;
        },
        addNewsGroup(state, action: PayloadAction<QLNewsGroup>) {
            state.newsGroups.push(action.payload);
        },
        clearNewsGroup( state, action: PayloadAction<QLNewsGroup[]> )
        {
            state.newsGroups = [];
        }
    }
} )

export const {  setNewsGroup, clearNewsGroup } = QLNewsSlice.actions;
export default QLNewsSlice.reducer;