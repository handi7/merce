import { Button, Card, Col, Form, Row, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import toCurrency from "../helper/client/toCurrency";
import SelectMarket from "../components/cart/SelectMarket";
import CartTable from "../components/table/CartTable";

const { Text } = Typography;

export default function Cart() {
  const cart = useSelector((state) => state.cart);

  const onFinish = async (values) => {
    try {
      console.log("Checkout");
      console.log(values);
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

  return (
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
  );
}
