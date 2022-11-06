import { Alert, Button, Col, Row, Spin } from "antd";
import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import { API_URL } from "../../lib/constants";

export default function Verify() {
  const { token } = useRouter().query;
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setLoading] = useState(true);

  const checkLink = async (token) => {
    try {
      const response = await axios.post(`${API_URL}/admins/verify`, { token });

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
    <Spin tip="Loading..." spinning={isLoading}>
      <div className="container text-center mt-5">
        <Row>
          <Col span={8} offset={8}>
            <Card className="mt-5 p-5">
              <h4>Verification Page</h4>
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
  );
}
