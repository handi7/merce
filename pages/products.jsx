import { Button, Card, Col, Row, Space, Table, Input, Tabs } from "antd";
import { BorderOutlined, UnorderedListOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddProduct from "../components/product/AddProduct.jsx";
import getProductImg from "../helper/client/getProductImage.js";
import toCurrency from "../helper/client/toCurrency.js";
import { API_URL } from "../lib/constants";
import productImg from "../public/product.jpg";
import List from "../components/product/table/List.jsx";
import CardList from "../components/product/table/CardList.jsx";

const { Search } = Input;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getProducts = async (search) => {
    try {
      const response = await axios.get(`${API_URL}/products/${search}`);
      setProducts(response.data.products);

      if (response.data.categories) {
        setCategories(response.data.categories);
        setUnits(response.data.units);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchHandler = (e) => {
    if (!e.target.value) {
      setSearchText("");
    }
  };

  useEffect(() => {
    if (searchText) {
      getProducts(searchText);
    } else {
      getProducts("");
    }
  }, [searchText]);

  return (
    <>
      {/* <Row>
        <Col span={16}> */}
      <Card className="rounded">
        <div className="d-flex justify-content-between align-items-end">
          <h4>Products</h4>
          <Space>
            <Search
              placeholder="search product"
              onSearch={(e) => setSearchText(e)}
              onChange={searchHandler}
              enterButton
            />
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Add Product
            </Button>
          </Space>
        </div>
        <Tabs
          defaultActiveKey="2"
          items={[BorderOutlined, UnorderedListOutlined].map((Icon, i) => {
            const title = ["Card", "List"];
            return {
              label: (
                <span>
                  <Icon />
                  {title[i]}
                </span>
              ),
              key: i,
              children:
                i === 0 ? (
                  <CardList products={products} />
                ) : (
                  <List products={products} />
                ),
            };
          })}
        />
      </Card>
      {/* </Col> */}
      {/* <Col span={7} offset={1}>
          <Card className="rounded"></Card>
        </Col> */}
      {/* </Row> */}
      <AddProduct
        open={drawerIsOpen}
        onClose={setDrawerOpen}
        img={productImg}
        categories={categories}
        units={units}
      />
    </>
  );
}
