import { Alert, Button, Col, Image, Row, Spin, Typography } from "antd";
import axios from "axios";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { PUBLIC_URL } from "../../lib/constants";

const { Title } = Typography;

export default function Verify() {
  const { token } = useRouter().query;
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setLoading] = useState(true);

  const checkLink = async (token) => {
    try {
      const response = await axios.post(`/api/admins/verify`, { token });

      setLoading(false);
      if (typeof response.data === "string") {
        setErrMsg(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = () => {
    Router.push("/login");
  };

  useEffect(() => {
    if (token) {
      setErrMsg("");
      checkLink(token);
    } else {
      setErrMsg("Link expired!");
      setLoading(false);
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>MERCE | Verification</title>
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

                  <h4>Verification Page</h4>
                </div>

                {errMsg ? (
                  <Alert message={errMsg} type="error" />
                ) : (
                  <>
                    <Alert message="Your account is verified!" type="success" />
                    <Button type="link" onClick={onLogin}>
                      Login
                    </Button>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      </Spin>
    </>
  );
}
