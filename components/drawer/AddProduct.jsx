import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { getProductImg } from "../../helper/client/images";

export default function AddProduct(props) {
  const { open, onClose, categories, units } = props;

  const [image, setImage] = useState({ file: null, preview: null });
  const [errImg, setErrImg] = useState("");
  const [inputs, setInputs] = useState({
    stock: null,
    per_pkg: null,
    stock_pkg: null,
  });

  const onFinish = async (values) => {
    try {
      if (!image.file) return setErrImg("Please select an image!");

      values.stock_pkg = Math.floor(values.stock / values.per_pkg);
      console.log(values);

      let formData = new FormData();
      formData.append("file", image.file);
      for (const key in values) {
        if (values[key]) {
          formData.append([key], values[key]);
        }
      }

      await axios.post(`/api/products/addProduct`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  // formatter and parser input number
  const formatterNumber = (val) => {
    if (!val) return null;
    return `${val}`
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      .replace(/\.(?=\d{0,2}$)/g, ",");
  };

  const parserNumber = (val) => {
    if (!val) return null;
    return Number.parseFloat(
      val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")
    ).toFixed(2);
  };

  const imgInputHandler = (e) => {
    const file = e.target.files[0];
    setImage({ file, preview: URL.createObjectURL(file) });
    setErrImg("");
  };

  return (
    <Drawer
      title="Add new Product"
      placement="right"
      onClose={() => onClose(false)}
      open={open}
      width={460}
    >
      <div className="text-center">
        <label htmlFor="inputImg">
          <Image
            style={{ cursor: "pointer" }}
            className="border rounded p-3 w-75"
            src={image.preview ? image.preview : getProductImg("")}
            alt="product"
          />
          <span>{errImg}</span>
        </label>
        <input
          className="d-none"
          id="inputImg"
          type="file"
          onChange={imgInputHandler}
        />
      </div>

      <div className="mt-5">
        <Form layout="vertical" onFinish={onFinish} initialValues={false}>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Please input product name!" },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please input price!" }]}
              >
                <InputNumber
                  className="w-100"
                  placeholder="Price"
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item
                label="Regular Price"
                name="regular_price"
                rules={[
                  { required: true, message: "Please input regular price!" },
                ]}
              >
                <InputNumber
                  className="w-100"
                  placeholder="Regular Price"
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="Stock"
                name="stock"
                getValueProps={(val) => val}
                rules={[{ required: true, message: "Please input stock!" }]}
              >
                <InputNumber
                  className="w-100"
                  value={inputs.stock}
                  placeholder="Stock"
                  onChange={(v) =>
                    setInputs({
                      ...inputs,
                      stock: v,
                      stock_pkg: inputs.per_pkg && v ? v / inputs.per_pkg : v,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item
                name="unit"
                label="Unit"
                rules={[{ required: true, message: "Please select unit!" }]}
              >
                <Select
                  className="w-100"
                  placeholder="Unit"
                  name="unit"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      {/* <Space style={{ padding: "0 8px 4px" }}> */}
                      <Row className="mx-2">
                        <Col span={11}>
                          <Input
                            placeholder="Add Unit"
                            size="small"
                            // ref={inputRef}
                            // value={input}
                            // onChange={inputHandler}
                          />
                        </Col>
                        <Col span={11} offset={2}>
                          <Button
                            block
                            type="primary"
                            size="small"
                            // onClick={addCategory}
                            // loading={isLoading}
                          >
                            Add Unit
                          </Button>
                        </Col>
                      </Row>
                      {/* </Space> */}
                    </>
                  )}
                >
                  {units.map((item) => (
                    <Select.Option key={item.id} value={item.unit}>
                      {item.unit}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                label="Per Pkg"
                name="per_pkg"
                getValueProps={(val) => val}
                rules={[
                  { required: true, message: "Please input per package!" },
                ]}
              >
                {/* <Input type="number" placeholder="Per pkg" /> */}
                <InputNumber
                  className="w-100"
                  value={inputs.per_pkg}
                  defaultValue={1}
                  placeholder="Per Pkg"
                  onChange={(v) =>
                    setInputs({
                      ...inputs,
                      per_pkg: v,
                      stock_pkg: inputs.stock && v ? inputs.stock / v : 0,
                    })
                  }
                />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item
                label="Stock(pkg)"
                name="stock_pkg"
                getValueProps={(val) => val}
              >
                <InputNumber
                  className="w-100"
                  value={inputs.stock_pkg}
                  placeholder="Stock(pkg)"
                  disabled
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="category_id"
                label="Category"
                rules={[{ required: true, message: "Please select category!" }]}
              >
                <Select
                  className="w-100"
                  placeholder="Category"
                  name="category_id"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      {/* <Space style={{ padding: "0 8px 4px" }}> */}
                      <Row className="mx-2">
                        <Col span={11}>
                          <Input
                            placeholder="Add category"
                            size="small"
                            // ref={inputRef}
                            // value={input}
                            // onChange={inputHandler}
                          />
                        </Col>
                        <Col span={11} offset={2}>
                          <Button
                            block
                            type="primary"
                            // icon={<PlusOutlined />}
                            size="small"
                            // onClick={addCategory}
                            // loading={isLoading}
                          >
                            Add Category
                          </Button>
                        </Col>
                      </Row>
                      {/* </Space> */}
                    </>
                  )}
                >
                  {categories.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="description" label="Description" defaultValue="">
                <Input.TextArea placeholder="Description" defaultValue={""} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}
