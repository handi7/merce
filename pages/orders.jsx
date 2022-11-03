import { Card, Input, Menu, Table, Tag, Typography } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import toCurrency from "../helper/client/toCurrency";
import { API_URL, PUBLIC_URL } from "../lib/constants";
import EllipsisDropdown from "../components/EllipsisDropdown";

const { Text } = Typography;
const { Search } = Input;

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

export default function Orders() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getOrders = async (text) => {
    try {
      const response = await axios.get(`${API_URL}/orders/getOrders/${text}`);
      setTotalOrders(response.data.count);
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (status, invId) => {
    try {
      await axios.patch(`${API_URL}/orders/updateStatus`, { status, invId });
      getOrders("");
    } catch (error) {
      console.log(error);
    }
  };
  const onSearch = (value) => {
    setSearchText(value);
    getOrders(value);
  };

  const onSearchChange = (e) => {
    if (!e.target.value) {
      getOrders("");
    }
  };

  useEffect(() => {
    getOrders("");
  }, []);

  const getMenuItem = (item) => {
    let stt = "";
    switch (item.status) {
      case "Packaging":
        stt = "Shipped";
        break;
      case "Shipped":
        stt = "Delivered";
        break;
      default:
        break;
    }

    if (item.status === "Done") return null;

    if (item.status === "Delivered") {
      return (
        <>
          <Menu.Item
            key={2}
            onClick={() => updateStatus("Done", item.invoice_id)}
          >
            <div className="d-flex align-items-center">
              <CheckCircleOutlined /> <span className="ms-2">Set Done</span>
            </div>
          </Menu.Item>
          <Menu.Item
            key={3}
            onClick={() => updateStatus("Returned", item.invoice_id)}
          >
            <div className="d-flex align-items-center">
              <CheckCircleOutlined /> <span className="ms-2">Set Returned</span>
            </div>
          </Menu.Item>
        </>
      );
    }

    if (item.status === "Returned") {
      return (
        <Menu.Item
          key={2}
          onClick={() => updateStatus("Done", item.invoice_id)}
        >
          <div className="d-flex align-items-center">
            <CheckCircleOutlined /> <span className="ms-2">Set Done</span>
          </div>
        </Menu.Item>
      );
    }

    return (
      <Menu.Item key={2} onClick={() => updateStatus(stt, item.invoice_id)}>
        <div className="d-flex align-items-center">
          <CheckCircleOutlined /> <span className="ms-2">Set {stt}</span>
        </div>
      </Menu.Item>
    );
  };

  const dropdownMenu = (item) => (
    <Menu>
      <Menu.Item key={1}>
        <div className="d-flex align-items-center">
          <EyeOutlined />
          <span className="ms-2">View Details</span>
        </div>
      </Menu.Item>
      {getMenuItem(item)}
    </Menu>
  );

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
      title: "Date",
      dataIndex: "created_at",
      render: (_, item) => {
        return (
          <span>{moment(item.created_at).format("DD MMM YYYY hh:mm a")}</span>
        );
      },
      sorter: {
        compare: (a, b) => {
          a = a.created_at.toLowerCase();
          b = b.created_at.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Admin",
      dataIndex: "first_name",
      render: (_, item) => {
        return <span>{item.first_name}</span>;
      },
      sorter: {
        compare: (a, b) => {
          a = a.first_name.toLowerCase();
          b = b.first_name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount",
      dataIndex: "grand_total",
      render: (_, item) => <span>{toCurrency(item.grand_total)}</span>,
      sorter: (a, b) => a.grand_total - b.grand_total,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Marketplace",
      dataIndex: "market",
      key: "market",
      render: (_, item) => (
        <Tag color={item.color}>
          <Text strong>{item.market}</Text>
        </Tag>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.market.toLowerCase();
          b = b.market.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => <Tag color={getTag(item.status)}>{item.status}</Tag>,
      sorter: {
        compare: (a, b) => {
          a = a.status.toLowerCase();
          b = b.status.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      key: "action",
      render: (_, item) => {
        return (
          <div className="text-right">
            <EllipsisDropdown menu={dropdownMenu(item)} />
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <div className="d-flex justify-content-between mb-3">
        <div>
          <h4>Orders</h4>
          <span>{`You have total ${totalOrders} orders.`}</span>
        </div>
        <Search
          style={{ width: "200px" }}
          placeholder="input search text"
          onSearch={onSearch}
          onChange={onSearchChange}
          allowClear
          enterButton={<SearchOutlined style={{ fontSize: "18px" }} />}
        />
      </div>
      <Table rowKey={(item) => item.id} columns={columns} dataSource={orders} />
    </Card>
  );
}
