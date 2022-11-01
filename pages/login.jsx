import { Col, Form, Input, Button, Row, Alert, Spin } from "antd";
import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "reactstrap";
import { API_URL } from "../lib/constants";
import { login } from "../store/functions/authFunction";

export default function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // console.log(user);

  const onFinish = async (values) => {
    login(dispatch, values);
  };

  useEffect(() => {
    if (user.id) {
      Router.push("/");
    }
  }, [user]);

  return (
    <Spin tip="Loading..." spinning={user.loading}>
      <div className="container mt-5">
        <Row>
          <Col span={8} offset={8}>
            <Card className="px-5 mt-5 pt-5">
              <h4>Login</h4>
              {user.errMsg ? (
                <Alert message={user.errMsg} type="error" showIcon />
              ) : null}
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    disabled={user.loading}
                    type="primary"
                    block
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
