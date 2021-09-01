import { createSlice } from '@reduxjs/toolkit';
import { getAll } from '../action/Action';

interface Movie {
  maPhim: string;
  tenPhim: string;
  biDanh: string;   
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
}
interface InitialState {
  value: Movie[];
  error: null;
  loading: boolean;
}
const initialState: InitialState = {
  value: [],
  error: null,
  loading: false,
};
export const listMovieSlice = createSlice({
  name: 'listMovie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, { payload }) => {
      // trạng thái thành công
      state.value = payload.data;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getAll.pending, (state) => {
      // trạng thái pending đang đợi loading
      state.value = [];
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAll.rejected, (state, { payload }) => {
      // trạng thái thất bại
      state.value = [];
      state.loading = false;
      state.error = payload.data;
    });
  },
});
const { reducer: listMovieReducer } = listMovieSlice;

export default listMovieReducer;