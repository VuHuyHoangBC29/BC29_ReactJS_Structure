import { Space, Table, Tag, Button } from "antd";
import { useAsync } from "hooks/useAsync";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieListApi } from "services/movie";
import { formatDate } from "utils/common";

export default function MovieTable() {
  const { state: data = [] } = useAsync({
    service: () => fetchMovieListApi(),
  });

  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (text, record) => {
        // text = record.dataIndex

        return <span>{formatDate(text)}</span>;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "danhGia",
      key: "danhGia",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              navigate(`/admin/movie-management/${record.maPhim}/update`)
            }
          >
            Edit
          </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table rowKey="maPhim" columns={columns} dataSource={data} />
      <div className="text-right mb-3">
        <Button
          onClick={() => navigate("/admin/movie-management/create")}
          type="primary"
        >
          Create
        </Button>
      </div>
    </div>
  );
}
