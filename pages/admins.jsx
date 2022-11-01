import { Card, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";

export default function admins() {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAdmins`);
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const columns = [
    {
      title: "Invoice",
      dataIndex: "invoice_id",
      render: (_, item) => {
        return <span>{item.invoice_id}</span>;
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
      render: (_, item) => <span>{item.email}</span>,
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
        <h4>Admins</h4>
      </div>
      <Table columns={columns} dataSource={admins} />
    </Card>
  );
}
