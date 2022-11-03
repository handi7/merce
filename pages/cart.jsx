import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProductImg from "../helper/client/getProductImage";
import toCurrency from "../helper/client/toCurrency";
import { API_URL } from "../lib/constants";
import { deleteCart, updateCart } from "../store/actions/CartAction";

const { Text } = Typography;

export default function Cart() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [markets, setMarkets] = useState([]);
  const [qty, setQty] = useState({});

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const getMarkets = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart/getMarkets`);
      setMarkets(response.data);
      setMarkets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddMarket = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const getGrandTotal = (data) => {
    let grand_total = 0;
    data.forEach((item) => {
      grand_total += item.price * item.qty;
    });
    return grand_total;
  };

  const getTotalQty = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.qty;
    });
    return total;
  };

  const onBtnDelete = (item) => {
    setDeleteItem(item);
    setOpen(true);
  };

  const onDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      deleteCart(user.id, deleteItem.id, dispatch);
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const onCancel = () => {
    setOpen(false);
    setDeleteItem({});
  };

  const onInputQtyChange = (val, id) => {
    if (val) {
      setQty({ ...qty, [id]: val });
      return updateCart(user.id, id, val, dispatch);
    }
    setQty({ ...qty, [id]: 1 });
    updateCart(user.id, id, 1, dispatch);
  };

  useEffect(() => {
    getMarkets();
  }, []);

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <Row>
            <Col span={4}>
              <Image
                height={50}
                src={getProductImg(item.image)}
                alt="product"
              />
            </Col>
            <Col span={20}>
              <span key={item.id}>{item.name}</span>
            </Col>
          </Row>
        );
      },
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, item) => {
        return <span key={item.id}>{toCurrency(item.price)}</span>;
      },
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (_, item) => {
        // <span key={item.id}>{item.qty}</span>
        return (
          <InputNumber
            style={{ width: "70px" }}
            min={1}
            max={item.stock}
            value={qty[item.id]}
            defaultValue={item.qty}
            onChange={(val) => onInputQtyChange(val, item.id)}
          />
        );
      },
      sorter: (a, b) => a.qty - b.qty,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, item) => (
        <span key={item.id}>{toCurrency(item.price * item.qty)}</span>
      ),
      sorter: (a, b) => a.price * a.qty - b.price * b.qty,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      key: "action",
      render: (_, item) => (
        <Tooltip title="delete">
          <Button
            type="danger"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onBtnDelete(item)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <Row>
      <Col span={16}>
        <Card>
          <div>
            <h4>Cart</h4>
            <Text type="secondary">{`You have totals ${cart.length} items in your cart.`}</Text>
          </div>
          <Table
            className="mt-2"
            columns={columns}
            dataSource={cart}
            pagination={{ pageSize: 10 }}
          />
          <Modal
            title="Delete item"
            open={open}
            onOk={onDelete}
            okType="danger"
            okText="Delete"
            confirmLoading={confirmLoading}
            onCancel={onCancel}
          >
            <div className="text-center">
              <DeleteOutlined
                className="text-danger mb-3"
                style={{ fontSize: "40px" }}
              />
              <p>Delete {deleteItem.name}?</p>
            </div>
          </Modal>
        </Card>
      </Col>
      <Col span={7} offset={1}>
        <Card>
          <div className="text-center">
            <h4>LOGO</h4>
            <div className="d-flex justify-content-between">
              <Text strong>Total Items:</Text>
              <span>{cart.length}</span>
            </div>
            <div className="d-flex justify-content-between">
              <Text strong>Total Qty:</Text>
              <span>{getTotalQty(cart)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <Text strong>Grand Total:</Text>
              <Text strong>{toCurrency(getGrandTotal(cart))}</Text>
            </div>
          </div>
          <Form layout="vertical" onFinish={onFinish}>
            <div className="my-5">
              <Form.Item
                label="Choose Market"
                name="market"
                rules={[{ required: true, message: "Please select market!" }]}
              >
                <Select
                  className="w-100"
                  placeholder="Market"
                  name="market"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: "8px 0" }} />
                      {/* <Space style={{ padding: "0 8px 4px" }}> */}
                      <Row className="mx-2">
                        <Col span={11}>
                          <Input
                            placeholder="Add Market"
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
                            Add Market
                          </Button>
                        </Col>
                      </Row>
                      {/* </Space> */}
                    </>
                  )}
                >
                  {markets.map((item) => (
                    <Option key={item.id} value={item.market}>
                      {item.market}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Place Order
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
