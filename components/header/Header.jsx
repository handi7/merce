import {
  Avatar,
  Badge,
  Dropdown,
  Image,
  Layout,
  Menu,
  message,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
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
import { logout } from "../../store/functions/authFunction";
import UserMenu from "./UserDropdown";
import CartDropdown from "./CartDropdown";
import { getCartItems } from "../../store/actions/CartAction";
import Profile from "../drawer/ProfileDrawer";
import getProfileImg from "../../helper/client/getProfileImage";

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
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Header
        className="d-flex justify-content-between align-items-center px-4"
        style={{
          padding: 0,
          backgroundColor: "#307DF0",
          position: "fixed",
          width: "100%",
          // marginRight: "200px",
          left: 0,
        }}
        // backgroundColor="blue"
      >
        <div className="d-flex align-items-center">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "cursor-pointer text-white p-2",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <h4 className="text-white mt-1 mx-3">LOGO</h4>
        </div>
        <Space size="large">
          <Dropdown
            placement="bottom"
            overlay={() => CartDropdown(cart)}
            trigger={["click"]}
          >
            <Badge size="small" count={cart.length}>
              <ShoppingCartOutlined
                style={{ fontSize: "20px", color: "white", cursor: "pointer" }}
              />
            </Badge>
          </Dropdown>

          <Dropdown
            placement="bottomRight"
            overlay={() => menu(dispatch)}
            trigger={["click"]}
          >
            <Badge size="small" count={3}>
              <MessageOutlined
                style={{ fontSize: "20px", color: "white", cursor: "pointer" }}
              />
            </Badge>
          </Dropdown>

          {/* <Dropdown
          className="me-3"
          placement="bottomRight"
          overlay={() => UserMenu(dispatch)}
          trigger={["click"]}
        >
          <div
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center"
          >
            <Avatar icon={<UserOutlined />} />
            <span className="ms-2 text-white">{`${user.first_name}`}</span>
          </div>
        </Dropdown> */}
          <div
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center"
            onClick={() => setOpen(!isOpen)}
          >
            <Avatar
              icon={
                user.image ? (
                  <Image preview={false} src={getProfileImg(user.image)} />
                ) : (
                  <UserOutlined />
                )
              }
            />
            <span className="ms-2 text-white">{`${user.first_name}`}</span>
          </div>
        </Space>
      </Header>
      <Profile isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
