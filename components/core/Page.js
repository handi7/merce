import { Avatar, Button, Layout, Menu } from "antd";
import Router, { withRouter } from "next/router";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./Page.module.css";
import { menuData } from "../../lib/menuData";
import Head from "../Header.jsx";
import Side from "../Sider.jsx";

const { Footer, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

const NonDashboardRoutes = [
  "/login",
  "/signup",
  "/forgot",
  "/lockscreen",
  "/_error",
];

const Page = ({ router, children }) => {
  const isDashboard = !NonDashboardRoutes.includes(router.pathname);
  const [collapsed, setCollapsed] = useState(true);

  return isDashboard ? (
    <Layout>
      <Side collapsed={collapsed} />
      <Layout className="bg-light">
        <Head collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          className="bg-light"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  ) : (
    children
  );
};

export default withRouter(Page);
