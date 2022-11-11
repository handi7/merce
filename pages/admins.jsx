import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Row,
  Table,
  Tag,
  Typography,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddAdmin from "../components/drawer/addAdmin";
import AdminDetails from "../components/drawer/AdminDetails";
import getProfileImg from "../helper/client/getProfileImage";
import { API_URL } from "../lib/constants";

const { Text } = Typography;

export default function admins() {
  const [admins, setAdmins] = useState([]);
  const [selected, setSelected] = useState({});
  const [isOpen, setOpen] = useState({ details: false, add: false });

  const getAdmins = async () => {
    try {
      const response = await axios.get(`${API_URL}/admins/getAdmins`);
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onOpen = (type, admin) => {
    if (type === "details") {
      setSelected(admin);
    }
    setOpen({ ...isOpen, [type]: true });
  };

  const onClose = (type) => {
    setOpen({ ...isOpen, [type]: false });
    setSelected({});
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (_, admin) => {
        return (
          <Row>
            <Col span={4}>
              <Avatar>
                <Image src={getProfileImg(admin.image)} />
              </Avatar>
            </Col>
            <Col span={20} className="d-flex flex-column">
              <Text strong>{`${admin.first_name} ${admin.last_name}`}</Text>
              <Text style={{ fontSize: "12px" }}>{admin.username}</Text>
            </Col>
          </Row>
        );
      },
      sorter: {
        compare: (a, b) => {
          a = a.first_name.toLowerCase();
          b = b.first_name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, admin) => {
        return <span>{admin.email}</span>;
      },
      sorter: {
        compare: (a, b) => {
          a = a.email.toLowerCase();
          b = b.email.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      render: (_, admin) => {
        return admin.is_verified ? (
          <Tag color={admin.is_active ? "green" : "red"}>
            {admin.is_active ? "Active" : "Deactived"}
          </Tag>
        ) : (
          <span>-</span>
        );
      },
      sorter: (a, b) => a.is_active - b.is_active,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Verified",
      dataIndex: "is_verified",
      key: "is_verified",
      render: (_, admin) => (
        <Tag color={admin.is_verified ? "green" : "red"}>
          {admin.is_verified ? "Verified" : "Unverified"}
        </Tag>
      ),
      sorter: (a, b) => a.is_verified - b.is_verified,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <>
      <Card>
        <div className="d-flex justify-content-between mb-3">
          <h4>Admins</h4>
          <Button type="primary" onClick={() => onOpen("add", "")}>
            Add New Admin
          </Button>
        </div>
        <Table
          rowKey={(item) => item.id}
          columns={columns}
          dataSource={admins}
          rowClassName={() => "cursor-pointer"}
          onRow={(admin) => {
            return {
              onClick: () => onOpen("details", admin),
            };
          }}
        />
      </Card>

      <AdminDetails
        admin={selected}
        isOpen={isOpen.details}
        onClose={onClose}
      />

      <AddAdmin isOpen={isOpen.add} onClose={onClose} />
    </>
  );
}
