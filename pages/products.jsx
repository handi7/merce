import { Button, Card, Space, Input, Tabs } from "antd";
import { BorderOutlined, UnorderedListOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LOCAL_TOKEN } from "../lib/constants";
import ProductCardTable from "../components/table/ProductCardTable.jsx";
import ProductList from "../components/table/ProductList.jsx";
import { useSelector } from "react-redux";
import Router from "next/router.js";
import AddProduct from "../components/drawer/AddProduct.jsx";
import Head from "next/head";

const { Search } = Input;

export default function Products() {
  const user = useSelector((state) => state.user);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const getProducts = async (search) => {
    try {
      const response = await axios.get(`/api/products/${search}`);
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

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_TOKEN);
    if (!token) {
      Router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>MERCE | Products</title>
      </Head>

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
            {user.role === "Admin" ? null : (
              <Button type="primary" onClick={() => setDrawerOpen(true)}>
                Add Product
              </Button>
            )}
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
                  <ProductCardTable products={products} />
                ) : (
                  <ProductList products={products} getProducts={getProducts} />
                ),
            };
          })}
        />
      </Card>

      <AddProduct
        open={drawerIsOpen}
        onClose={setDrawerOpen}
        categories={categories}
        units={units}
      />
    </>
  );
}
