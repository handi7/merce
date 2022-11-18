import Router from "next/router";
import { useEffect } from "react";
import { Col, Row } from "antd";
import Revenue from "../components/dashboard/Revenue";
import Profit from "../components/dashboard/Profit";
import RecentOrder from "../components/dashboard/RecentOrder";
import TopProducts from "../components/dashboard/TopProducts";
import { LOCAL_TOKEN } from "../lib/constants";
import Head from "next/head";

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (!token) {
      Router.push("/login");
    }
  }, []);

  return (
    // <div className={styles.container}>
    <>
      <Head>
        <title>MERCE | Dashboard</title>
      </Head>
      <Row>
        <Col span={11} offset={1}>
          <Revenue />
        </Col>
        <Col span={11} offset={1}>
          <Profit />
        </Col>
      </Row>

      <Row className="mt-5">
        <Col span={11} offset={1}>
          <RecentOrder />
        </Col>
        <Col span={11} offset={1}>
          <TopProducts />
        </Col>
      </Row>
    </>
    // </div>
  );
}
