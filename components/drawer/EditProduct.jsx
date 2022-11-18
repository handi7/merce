import {
  Badge,
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { getProductImg } from "../../helper/client/images";

export default function EditProduct({
  product,
  isEdit,
  onCancel,
  getProducts,
}) {
  const [form] = Form.useForm();
  const [image, setImage] = useState({ file: null, preview: null });

  const onFinish = async (values) => {
    let formData = new FormData();
    for (const key in values) {
      if (values[key] === product[key]) {
        delete values[key];
        continue;
      }
      formData.append(key, values[key]);
    }

    if (image.file) {
      formData.append("file", image.file);
    }

    console.log(values);
    if (Object.keys(values).length || image.file) {
      formData.append("id", product.id);
      await axios.patch(`/api/products/updateProduct`, formData);
      setImage({ file: null, preview: null });
      getProducts("");
      onCancel();
    }
  };

  const onClose = () => {
    setImage({ file: null, preview: null });
    form.resetFields();
    onCancel();
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
  };

  useEffect(() => {
    for (const key in product) {
      form.setFieldsValue({
        [key]: product[key],
      });
    }
  }, [product]);

  return (
    <Drawer
      title="Update Product"
      placement="right"
      onClose={onClose}
      open={isEdit}
      width={460}
    >
      <div className="text-center">
        <Badge
          count={
            image.file ? (
              <Button
                shape="circle"
                type="text"
                danger
                icon={<CloseCircleOutlined />}
                onClick={() => setImage({ file: null, preview: null })}
              />
            ) : null
          }
        >
          <label htmlFor="inputImg">
            <Image
              style={{ cursor: "pointer" }}
              className="border rounded p-3 w-75"
              src={image.preview ? image.preview : getProductImg(product.image)}
              alt="product"
            />
            {/* <span>{errImg}</span> */}
          </label>
        </Badge>
        <input
          className="d-none"
          id="inputImg"
          type="file"
          onChange={imgInputHandler}
        />
      </div>

      <div className="mt-5">
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item label="Product Name" name="name">
                <Input placeholder="Name" />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item label="Price" name="price">
                <InputNumber
                  className="w-100"
                  placeholder="Price"
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item label="General Price" name="general_price">
                <InputNumber
                  className="w-100"
                  placeholder="Regular Price"
                  formatter={(value) => formatterNumber(value)}
                  parser={(value) => parserNumber(value)}
                />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item label="Stock">
                <InputNumber
                  className="w-100"
                  placeholder="Stock"
                  value={product.stock}
                  disabled
                />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item label="Unit">
                <InputNumber
                  className="w-100"
                  placeholder="Unit"
                  value={product.unit}
                  disabled
                />
              </Form.Item>
              {/* <Select
                  className="w-100"
                  placeholder="Unit"
                  name="unit"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      <Space style={{ padding: "0 8px 4px" }}>
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
                      </Space>
                    </>
                  )}
                >
                  {units.map((item) => (
                    <Option key={item.id} value={item.unit}>
                      {item.unit}
                    </Option>
                  ))}
                </Select> */}
            </Col>

            <Col span={11}>
              <Form.Item label="Per Pkg" name="per_pkg">
                <InputNumber className="w-100" placeholder="Per Pkg" />
              </Form.Item>
            </Col>

            <Col span={11} offset={2}>
              <Form.Item label="Stock(pkg)">
                <InputNumber
                  className="w-100"
                  defaultValue={product.stock_pkg}
                  placeholder="Stock(pkg)"
                  disabled
                />
              </Form.Item>
            </Col>

            {/* <Col span={24}>
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
                      <Space style={{ padding: "0 8px 4px" }}>
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
                      </Space>
                    </>
                  )}
                >
                  {categories.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}

            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Drawer>
  );
}
