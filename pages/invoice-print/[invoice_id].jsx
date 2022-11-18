import { Button, Card, Col, Image, Row, Space, Table, Typography } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toCurrency } from "../../helper/client/number";
import { LOCAL_TOKEN, PUBLIC_URL } from "../../lib/constants";
import Head from "next/head";

const { Title, Text } = Typography;

export default function Invoice() {
  const { invoice_id } = useRouter().query;
  const [invoice, setInvoice] = useState({});
  const [items, setItems] = useState();

  const getInvoice = async (id) => {
    try {
      const response = await axios.get(`/api/orders/${id}`);
      setInvoice(response.data.invoice);
      setItems(response.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (invoice_id) {
      getInvoice(invoice_id);
      setTimeout(() => window.print(), 500);
    }
  }, [invoice_id]);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (!token) {
      Router.push("/login");
    }
  }, []);

  const columns = [
    {
      title: "Product",
      render: (_, item) => {
        return <span key={item.id}>{item.name}</span>;
      },
    },
    {
      title: "Price",
      render: (_, item) => {
        return <span key={item.id}>{toCurrency(item.price)}</span>;
      },
    },
    {
      title: "Qty",
      render: (_, item) => {
        return <span key={item.id}>{item.qty}</span>;
      },
    },
    {
      title: "Total",
      render: (_, item) => {
        return <span key={item.id}>{toCurrency(item.qty * item.price)}</span>;
      },
    },
  ];

  return (
    <>
      <Head>
        <title>MERCE | Invoice</title>
      </Head>

      <Card className="mt-5 mx-1 rounded">
        <Row>
          <Col
            span={24}
            className="d-flex justify-content-between align-items-end mb-3"
          >
            <Space direction="vertical">
              <Title level={4}>MERCE</Title>

              <Space>
                <Image
                  width={20}
                  src={`${PUBLIC_URL}/location.png`}
                  preview={false}
                  alt="location"
                />

                <Text>Jl. KH Nur Ali no. 63</Text>
              </Space>

              <Space>
                <Image
                  width={20}
                  src={`${PUBLIC_URL}/phone.png`}
                  preview={false}
                  alt="phone"
                />

                <Text>021234567</Text>
              </Space>
            </Space>

            <div>
              {/* <Title level={5}>INVOICE</Title> */}
              <div className="d-flex">
                <Space direction="vertical">
                  <Text>INVOICE ID</Text>
                  <Text>DATE</Text>
                </Space>

                <Space direction="vertical" className="mx-3">
                  <Text>:</Text>
                  <Text>:</Text>
                </Space>

                <Space direction="vertical" className="text-end">
                  <Text>{invoice.invoice_id}</Text>
                  <Text>
                    {moment(invoice.created_at).format("DD MMMM YYYY")}
                  </Text>
                </Space>
              </div>
            </div>
          </Col>

          <Col span={24}>
            <Table
              className="mt-5"
              rowKey={(item) => item.id}
              columns={columns}
              dataSource={items}
              pagination={false}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end mt-5">
          <div
            style={{ width: 200 }}
            className="d-flex justify-content-between"
          >
            <Title level={5}>Grand Total:</Title>
            <Text strong>{toCurrency(invoice.grand_total)}</Text>
          </div>
        </div>
      </Card>
    </>
  );
}
