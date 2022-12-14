import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  notification,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { GROUP_ID } from "constants/common";
import { useAsync } from "hooks/useAsync";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieDetailApi } from "services/movie";
import { addMovieUploadImage } from "services/movie";
import { formatDate } from "utils/common";
import moment from "moment";
import { updateMovieUploadImage } from "services/movie";

export default function MovieForm() {
  const [componentSize, setComponentSize] = useState("default");

  const [image, setImage] = useState();

  const [file, setFile] = useState();

  const navigate = useNavigate();

  const params = useParams();

  const [form] = Form.useForm();

  const { state: movieDetail } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
    dependencies: [params.movieId],
    condition: !!params.movieId,
  });

  useEffect(() => {
    if (movieDetail) {
      form.setFieldsValue({
        ...movieDetail,
        ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
      });

      setImage(movieDetail.hinhAnh);
    }
  }, [movieDetail]);

  console.log(movieDetail);

  const onFormLayoutChange = (event) => {
    setComponentSize(event.target.value);
  };

  const handleSave = async (values) => {
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");
    values.maNhom = GROUP_ID;

    const formData = new FormData();

    // const { tenPhim, trailer, moTa, dangChieu, sapChieu, ngayKhoiChieu, danhGia, hot } = values;

    // formData.append("tenPhim", tenPhim);
    // formData.append("trailer", trailer);
    // formData.append("moTA", moTa);
    // formData.append("dangChieu", dangChieu);
    // formData.append("sapChieu", sapChieu);
    // formData.append("ngayKhoiChieu", ngayKhoiChieu);
    // formData.append("danhGia", danhGia);
    // formData.append("hot", hot);

    for (const key in values) {
      console.log(key);
      formData.append(key, values[key]);
    }

    file && formData.append("File", file, file.name);

    params.movieId && formData.append("maPhim", params.movieId);

    if (params.movieId) {
      await updateMovieUploadImage(formData);
    } else {
      await addMovieUploadImage(formData);
    }

    notification.success({
      message: "Successfully",
    });

    navigate("/admin/movie-management ");
  };

  const handleChangeImage = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (e) => {
      setImage(e.target.result);
      setFile(file);
    };

    console.log(file);
  };

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="vertical"
      initialValues={{
        tenPhim: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        hot: true,
        trailer: "",
        danhGia: "",
      }}
      onFinish={handleSave}
      size={componentSize}
    >
      <Form.Item label="Form Size">
        <Radio.Group defaultValue={componentSize} onChange={onFormLayoutChange}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="T??n phim" name={"tenPhim"}>
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item label="M?? t???" name="moTa">
        <Input />
      </Form.Item>
      <Form.Item label="Ng??y kh???i chi???u" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>

      <Form.Item label="??ang chi???u" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>

      <Form.Item label="S???p chi???u" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>

      <Form.Item label="Hot" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item label="S??? sao" name="danhGia">
        <InputNumber />
      </Form.Item>
      <Form.Item label="H??nh ???nh" onChange={handleChangeImage}>
        <Input type="file" />
      </Form.Item>

      <Image src={image} />
      <Form.Item>
        <Button htmlType="submit" type="primary">
          SAVE
        </Button>
      </Form.Item>
    </Form>
  );
}
