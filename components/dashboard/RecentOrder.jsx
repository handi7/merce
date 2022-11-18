import { Card, Table, Tag, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toCurrency } from "../../helper/client/number";

const { Text } = Typography;

const getTag = (status) => {
  switch (status) {
    case "Shipped":
      return "blue";

    case "Delivered":
      return "cyan";

    case "Done":
      return "green";

    case "Returned":
      return "red";

    default:
      return "gold";
  }
};

export default function RecentOrder() {
  const [orders, setOrders] = useState([]);

  let id = 0;

  const getRecentOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/getRecentOrders`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentOrders();
  }, []);

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice_id",
      render: (_, item) => {
        return (
          <div style={{ height: 40 }}>
            <Text strong>{item.invoice_id}</Text>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "created_at",
      render: (_, item) => {
        return <span>{moment(item.created_at).format("DD MMM YYYY")}</span>;
      },
    },
    {
      title: "Amount",
      dataIndex: "grand_total",
      render: (_, item) => <span>{toCurrency(item.grand_total)}</span>,
    },
    {
      title: "Marketplace",
      dataIndex: "market",
      key: "market",
      render: (_, item) => (
        <Tag>
          <Text strong>{item.market}</Text>
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => <Tag color={getTag(item.status)}>{item.status}</Tag>,
    },
  ];

  return (
    <Card>
      <Typography.Title level={3}>Recent Orders</Typography.Title>
      <Table
        rowKey={() => {
          id++;
          return id;
        }}
        columns={columns}
        dataSource={orders}
        pagination={false}
      />
    </Card>
  );
}
