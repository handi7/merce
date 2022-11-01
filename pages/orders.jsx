import { Card, Table, Typography } from "antd";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import toCurrency from "../helper/client/toCurrency";
import { API_URL, PUBLIC_URL } from "../lib/constants";

const { Text } = Typography;

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/getOrders`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice_id",
      render: (_, item) => {
        return (
          <Text
            strong
            style={{ cursor: "pointer" }}
            onClick={() =>
              Router.push(`${PUBLIC_URL}/invoice/${item.invoice_id}`)
            }
          >
            {item.invoice_id}
          </Text>
        );
      },
      sorter: {
        compare: (a, b) => {
          a = a.invoice_id.toLowerCase();
          b = b.invoice_id.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (_, item) => {
        return <span>{item.category}</span>;
      },
      sorter: {
        compare: (a, b) => {
          a = a.category.toLowerCase();
          b = b.category.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount",
      dataIndex: "grand_total",
      //   key: "age",
      //   width: "20%",
      render: (_, item) => <span>{toCurrency(item.grand_total)}</span>,
      //   ...getColumnSearchProps("age"),
      sorter: (a, b) => a.grand_total - b.grand_total,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (_, item) => <span>{item.stock}</span>,
      //   ...getColumnSearchProps("address"),
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <Card>
      <div>
        <h4>Orders</h4>
      </div>
      <Table columns={columns} dataSource={orders} />;
    </Card>
  );
}
