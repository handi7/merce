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
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddAdmin from "../components/drawer/addAdmin";
import AdminDetails from "../components/drawer/AdminDetails";
import { LOCAL_TOKEN } from "../lib/constants";
import { getProfileImg } from "../helper/client/images";
import Head from "next/head";

const { Text } = Typography;

export default function Admins() {
  const user = useSelector((state) => state.user);

  const [admins, setAdmins] = useState([]);
  const [selected, setSelected] = useState({});
  const [isOpen, setOpen] = useState({ details: false, add: false });

  const getAdmins = async () => {
    try {
      const response = await axios.get(`/api/admins/getAdmins`);
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

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (!token) {
      Router.push("/login");
    }
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
              <Avatar
                icon={
                  admin.image ? (
                    <Image
                      src={getProfileImg(admin.image)}
                      alt="profile"
                      preview={false}
                    />
                  ) : (
                    <UserOutlined />
                  )
                }
              ></Avatar>
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
      <Head>
        <title>MERCE | Admins</title>
      </Head>

      <Card>
        <div className="d-flex justify-content-between mb-3">
          <h4>Admins</h4>

          {user.role === "Admin" ? null : (
            <Button type="primary" onClick={() => onOpen("add", "")}>
              Add New Admin
            </Button>
          )}
        </div>

        <Table
          rowKey={(item) => item.id}
          columns={columns}
          dataSource={admins}
          onRow={(admin) => {
            return {
              style: { cursor: "pointer" },
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

      <AddAdmin isOpen={isOpen.add} onClose={onClose} getAdmins={getAdmins} />
    </>
  );
}
