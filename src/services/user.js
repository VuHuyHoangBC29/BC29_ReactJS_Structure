import axios from "axios";
import { request } from "../configs/axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/common";

export const loginApi = (data) => {
  return request({
    data: data,
    url: "/QuanLyNguoiDung/DangNhap",
    method: "POST",
  });
};
