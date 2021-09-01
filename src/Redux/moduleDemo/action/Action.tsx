import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const callAPI = () =>
  axios({
    method: 'GET',
    url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
  });

export const getAll: any = createAsyncThunk(
  'listMovie/getAll',
  async (params, thunkAPI) => {
    //    thunkAPI.dispatch() để bắn lên store
    const listMovie = await callAPI();
    return listMovie.data;
  }
);
