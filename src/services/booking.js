import { request } from "../configs/axios";

const fetchRoomListApi = (showTimesId) => {
  return request({
    url: `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showTimesId}`,
    method: "GET",
  });
};

const bookingTicketApi = (data) => {
  return request({
    url: "/QuanLyDatVe/DatVe",
    method: "POST",
    data,
  });
};

export { fetchRoomListApi, bookingTicketApi };
