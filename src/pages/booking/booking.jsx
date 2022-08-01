import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Chair from "../../modules/chair/chair";
import { bookingTicketApi, fetchRoomListApi } from "../../services/booking";

function Booking() {
  const [danhSachGhe, setDanhSachGhe] = useState([]);

  const [roomList, setRoomList] = useState();

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchRoomList();
  }, []);

  const fetchRoomList = async () => {
    const result = await fetchRoomListApi(params.maLichChieu);

    setRoomList(result.data.content);
    console.log(result);
  };

  const handleSelect = (selectedChair) => {
    const data = [...danhSachGhe];
    const idx = data.findIndex((ele) => ele.tenGhe === selectedChair.tenGhe);

    if (idx !== -1) {
      data.splice(idx, 1);
    } else {
      data.push(selectedChair);
    }

    setDanhSachGhe(data);
  };

  const handleBookingTicker = async () => {
    console.log(danhSachGhe);
    const danhSachVe = danhSachGhe.map((ele) => {
      return {
        maGhe: ele.maGhe,
        giaVe: ele.giaVe,
      };
    });

    const submitData = {
      maLichChieu: params.maLichChieu,
      danhSachVe,
    };

    await bookingTicketApi(submitData);

    alert("ĐẶT VÉ THÀNH CÔNG");

    navigate("/");

    console.log(danhSachVe);
  };

  return roomList ? (
    <div>
      <div className="row w-75 mx-auto my-5">
        <div className="col-8">
          {roomList.danhSachGhe.map((ele, idx) => {
            let classGheVip = ele.loaiGhe === "Vip" ? "gheVip" : "";
            return (
              <Fragment key={ele.tenGhe}>
                <Chair handleSelect={handleSelect} item={ele} />
                {(idx + 1) % 16 === 0 && <br />}
              </Fragment>
            );
          })}
        </div>
        <div className="col-4">
          <img
            className="img-fluid"
            src={roomList.thongTinPhim.hinhAnh}
            alt="image"
          />
          <h4>Tên phim: {roomList.thongTinPhim.tenPhim}</h4>
          <h5>Mô tả: {roomList.thongTinPhim.moTa}</h5>
          <p>
            Ghế:{" "}
            {danhSachGhe.map((ele) => {
              return (
                <span key={ele.tenGhe} className="badge badge-success">
                  {ele.tenGhe}
                </span>
              );
            })}
          </p>
          <p>
            Tổng tiền:{" "}
            {danhSachGhe
              .reduce((previousValue, currentValue) => {
                return (previousValue += currentValue.giaVe);
              }, 0)
              .toLocaleString()}
            VNĐ
          </p>
          <button onClick={handleBookingTicker} className="btn btn-info">
            ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  ) : (
    "Loading..."
  );
}

export default Booking;
