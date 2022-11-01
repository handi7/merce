import { Avatar, Badge, Dropdown, Layout, Menu, message, Space } from "antd";
import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { logout } from "../store/functions/authFunction";

const { Header } = Layout;

const menu = (dispatch) => {
  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      return logout(dispatch);
    }

    // Router.push(key);
    message.success(key);
  };

  return (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          label: (
            <div className="d-flex align-items-center">
              <UserOutlined />
              <span className="ms-2">Profile</span>
            </div>
          ),
          key: "/profile",
        },
        {
          type: "divider",
        },
        {
          label: (
            <div className="d-flex align-items-center">
              <LogoutOutlined />
              <span className="text-danger ms-2">Logout</span>
            </div>
          ),
          key: "logout",
        },
      ]}
    />
  );
};

export default function Head({ collapsed, setCollapsed }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Header
      className="d-flex justify-content-between align-items-center px-4"
      style={{
        padding: 0,
        backgroundColor: "#307DF0",
      }}
      // backgroundColor="blue"
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "cursor-pointer text-white",
        onClick: () => setCollapsed(!collapsed),
      })}
      <Space size="large">
        <Badge size="small" count={3}>
          {/* <Avatar icon={<ShoppingCartOutlined />} /> */}
          <ShoppingCartOutlined style={{ fontSize: "20px", color: "white" }} />
        </Badge>
        <Badge size="small" count={3}>
          <MessageOutlined style={{ fontSize: "20px", color: "white" }} />
        </Badge>
        <Dropdown
          className="me-3"
          placement="bottomRight"
          overlay={() => menu(dispatch)}
          trigger={["click"]}
        >
          <div
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center"
          >
            <Avatar icon={<UserOutlined />} />
            <span className="ms-2 text-white">{`${user.first_name}`}</span>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
}
