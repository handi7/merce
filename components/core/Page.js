import { Layout } from "antd";
import { withRouter } from "next/router";
import React, { useState } from "react";
import Side from "../Sider.jsx";
import Head from "../header/Header";

const { Footer, Content } = Layout;

const NonDashboardRoutes = [
  "/login",
  "/signup",
  "/forgot",
  "/lockscreen",
  "/_error",
];

const Page = ({ router, children }) => {
  const isDashboard = !NonDashboardRoutes.includes(router.pathname);
  const [collapsed, setCollapsed] = useState(false);

  return isDashboard ? (
    <Layout hasSider style={{ minHeight: "100vh" }}>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}
        className="bg-light"
      >
        <Content
          className="bg-light"
          style={{
            margin: "60px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Side collapsed={collapsed} />
        <Head collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </Layout>
  ) : (
    children
  );
};

export default withRouter(Page);
