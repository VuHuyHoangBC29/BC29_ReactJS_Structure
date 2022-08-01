import axios, { Axios } from "axios";
import { request } from "../configs/axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/common";

export const fetchMovieListApi = () => {
  return request({
    url: `/QuanLyPhim/LayDanhSachPhim?maNhom=GP01`,
    method: "GET",
  });
};

export const fetchMovieDetailApi = (movieId) => {
  return request({
    url: `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};


