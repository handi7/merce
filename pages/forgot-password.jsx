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
import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { Card } from "reactstrap";
import { LOCAL_TOKEN, PUBLIC_URL } from "../lib/constants";

const { Title } = Typography;

export default function Forgot() {
  const [msg, setMsg] = useState({ err: "", success: "" });
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setMsg({ err: "", success: "" });
      setLoading(true);
      const response = await axios.post("/api/admins/sendReset", values);
      setMsg({ ...msg, success: response.data });
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        setMsg({ ...msg, err: error.response.data });
        setLoading(false);
      }
    }
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
        <title>MERCE | Forgot Password</title>
      </Head>

      <Spin tip="Loading..." spinning={loading}>
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

                  <h4>Forgot Password</h4>
                </div>

                {msg.err ? (
                  <Alert
                    className="text-center"
                    message={msg.err}
                    type="error"
                  />
                ) : null}

                {msg.success ? (
                  <Alert
                    className="text-center"
                    message={msg.success}
                    type="success"
                  />
                ) : null}

                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input placeholder="type your email" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      disabled={loading}
                      type="primary"
                      block
                      htmlType="submit"
                    >
                      Send Link
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
}
