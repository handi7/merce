import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PUBLIC_URL } from "../../lib/constants";

const { Title, Link } = Typography;

export default function Reset() {
  const { token } = useRouter().query;
  const [msg, setMsg] = useState({ err: "", success: "" });
  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useState(null);

  const checkLink = async (token) => {
    try {
      const res = await axios.post(`/api/admins/checkLink`, { token });
      setId(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        setLoading(false);
        setMsg({ ...msg, err: error.response.data });
      }
      setLoading(false);
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    values.id = id;
    const res = await axios.patch(`/api/admins/resetPassword`, values);
    setMsg({ ...msg, success: res.data });
  };

  useEffect(() => {
    if (token) {
      setMsg({ ...msg, err: "" });
      checkLink(token);
    } else {
      setMsg({ ...msg, err: "Link expired!" });
      setLoading(false);
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>MERCE | Reset Password</title>
      </Head>

      <Spin tip="Loading..." spinning={isLoading}>
        <div className="container text-center mt-5">
          <Row>
            <Col span={8} offset={8}>
              <Card className="shadow mt-5 p-5">
                <div className="text-center">
                  <Image
                    src={`${PUBLIC_URL}/logo.png`}
                    height={50}
                    alt="logo"
                    preview={false}
                  />

                  <Title level={2}>MERCE</Title>

                  <h4>Reset Password</h4>
                </div>

                {msg.err ? (
                  <Alert message={msg.err} type="error" />
                ) : msg.success ? (
                  <>
                    <Alert
                      message={"Password has been reset."}
                      type="success"
                    />
                    <Link href="/login">Login</Link>
                  </>
                ) : (
                  <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Please input new password",
                        },
                        {
                          pattern: new RegExp(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                          ),
                          message:
                            "Min 8 char. included uppercase & lowercase letter, number, and symbol.",
                        },
                      ]}
                    >
                      <Input.Password placeholder="New Password" />
                    </Form.Item>

                    <Form.Item
                      label="Repeat New Password"
                      name="repeat"
                      rules={[
                        {
                          required: true,
                          message: "Please repeat new password",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "The two passwords that you entered do not match!"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Repeat Password" />
                    </Form.Item>

                    <Form.Item>
                      <Button
                        disabled={isLoading}
                        type="primary"
                        block
                        htmlType="submit"
                      >
                        Reset
                      </Button>
                    </Form.Item>
                  </Form>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
}
