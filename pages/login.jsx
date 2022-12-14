import {
  Col,
  Form,
  Input,
  Button,
  Row,
  Alert,
  Spin,
  Typography,
  Image,
} from "antd";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "reactstrap";
import { LOCAL_TOKEN, PUBLIC_URL } from "../lib/constants";
import { login } from "../store/actions/authAction";

const { Link, Title } = Typography;

export default function Login() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    login(dispatch, values);
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (token) {
      Router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>MERCE | Login</title>
      </Head>

      <Spin tip="Loading..." spinning={user.loading}>
        <div className="container mt-5">
          <Row>
            <Col span={8} offset={8}>
              <Card className="shadow px-5 mt-5 pt-5">
                <div className="text-center">
                  <Image
                    src={`${PUBLIC_URL}/logo.png`}
                    height={50}
                    alt="logo"
                    preview={false}
                  />

                  <Title level={2}>MERCE</Title>

                  <h4>Login</h4>
                </div>

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
                      {
                        required: true,
                        message: "Please input your password!",
                      },
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

                  <div className="text-center mb-3">
                    <Link href="/forgot-password">forgot password?</Link>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
}
