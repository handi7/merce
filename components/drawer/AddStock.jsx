import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Image,
  InputNumber,
  Modal,
  Row,
  Typography,
} from "antd";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getProductImg } from "../../helper/client/images";

const { Text } = Typography;

export default function AddStock({ product, isEdit, onCancel, getProducts }) {
  const [form] = Form.useForm();

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onAddStock = async () => {
    setLoading(true);
    const { add_stock } = form.getFieldsValue();
    const stock_pkg = Math.floor((add_stock + product.stock) / product.per_pkg);

    await axios.patch(`/api/products/addStock`, {
      add_stock,
      stock_pkg,
      id: product.id,
    });

    form.resetFields();
    setLoading(false);
    setModal(false);
    getProducts("");
    onCancel();
  };

  const onClose = () => {
    onCancel();
  };

  useEffect(() => {
    for (const key in product) {
      form.setFieldsValue({ [key]: product[key] });
    }
  }, [product]);

  return (
    <Drawer
      title="Add Stock"
      placement="right"
      onClose={onClose}
      open={isEdit}
      width={460}
    >
      <Row>
        <Col span={24} className="text-center">
          <Image
            height={200}
            src={getProductImg(product.image)}
            preview={false}
            alt="product"
          />
        </Col>

        <Card className=" mt-3">
          <Form layout="vertical" form={form} onFinish={() => setModal(true)}>
            <Row>
              <Col span={24}>
                <Form.Item label="Product Name">
                  <Text strong className="form-control">
                    {product.name}
                  </Text>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Stock">
                  <Text strong className="form-control">
                    {`${product.stock} ${product.unit}`}
                  </Text>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Add Stock"
                  name="add_stock"
                  rules={[{ required: true, message: "Please input stock!" }]}
                >
                  <InputNumber className="w-100" placeholder="Add Stock" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label=" ">
                  <Text>{product.unit}</Text>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Add Stock
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Modal
          open={modal}
          onCancel={() => setModal(false)}
          onOk={onAddStock}
          okText="Add"
          confirmLoading={loading}
          closable={false}
        >
          <Text strong>
            Add Stock {form.getFieldValue("add_stock")} {product.unit}?
          </Text>
        </Modal>
      </Row>
    </Drawer>
  );
}
