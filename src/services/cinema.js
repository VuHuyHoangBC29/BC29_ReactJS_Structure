import axios from "axios";
import { request } from "../configs/axios";

export const fetchMovieShowTimesApi = (movieId) => {
  return request({
    url: `/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`,
    method: "GET",
  });
};
