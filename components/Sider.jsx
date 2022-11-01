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
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo text-center my-3">
        {collapsed ? (
          <h4 className="text-white">L</h4>
        ) : (
          <h4 className="text-white">LOGO</h4>
        )}
      </div>
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
