import { Button, Card, Col, Form, Modal, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectMarket from "../components/cart/SelectMarket";
import CartTable from "../components/table/CartTable";
import axios from "axios";
import { LOCAL_TOKEN } from "../lib/constants";
import { getCartItems } from "../store/actions/CartAction";
import Router from "next/router";
import { toCurrency } from "../helper/client/number";
import Head from "next/head";

const { Text } = Typography;

export default function Cart() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [market, setMarket] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setMarket(values.market);
      setOpen(true);
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

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(async () => {
      await axios.post(`/api/cart/checkout`, {
        user_id: user.id,
        market,
        cart,
      });
      getCartItems(user.id, dispatch);
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (!token) {
      Router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>MERCE | Cart({cart.length})</title>
      </Head>

      <Row>
        <Col span={16}>
          <Card>
            <div>
              <h4>Cart</h4>
              <Text type="secondary">{`You have totals ${cart.length} items in your cart.`}</Text>
            </div>

            <CartTable />
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
                <SelectMarket Item={Form.Item} />
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

      <Modal
        title="Place Order"
        open={open}
        onOk={handleOk}
        okText="Place Order"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Please double check your order!</p>
      </Modal>
    </>
  );
}
