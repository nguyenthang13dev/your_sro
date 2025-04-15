import { tableQLTinTucDataType } from '@/interface/qlTinTuc/qlTinTuc'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TinTucState = {
  currentTinTuc?: tableQLTinTucDataType
}

const initialState = {
  currentTinTuc: undefined,
} as TinTucState

export const tinTucSlice = createSlice({
  name: 'tinTuc',
  initialState,
  reducers: {
    reset: () => initialState,
    setTinTuc: (
      state,
      action: PayloadAction<tableQLTinTucDataType | undefined>
    ) => {
      state.currentTinTuc = action.payload
    },
  },
})

export const { setTinTuc, reset } = tinTucSlice.actions
export default tinTucSlice.reducer
