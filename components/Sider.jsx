import { Layout, Menu } from "antd";
import Router from "next/router";
import React from "react";
import { menuData } from "../lib/menuData";

const { Sider } = Layout;

export default function Side({ collapsed }) {
  const onMenuClick = ({ key }) => {
    Router.push(key);
  };

  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        paddingTop: 10,
        left: 0,
        top: 60,
        bottom: 0,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/"]}
        items={menuData}
        onClick={onMenuClick}
      />
    </Sider>
  );
}
