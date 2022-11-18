import { Card, Image, Table, Typography } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getProductImg } from "../../helper/client/images";
import { toCurrency } from "../../helper/client/number";

const { Text, Title } = Typography;

export default function TopProducts() {
  const [products, setProducts] = useState([]);

  let id = 0;

  const getTopProducts = async () => {
    try {
      const response = await axios.get(`/api/products/getTopProducts`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopProducts();
  }, []);

  const columns = [
    {
      render: (_, product) => {
        return (
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div style={{ width: "80px" }}>
                <Image
                  className="p-2"
                  src={getProductImg(product.image)}
                  height={50}
                  preview={false}
                  alt="product"
                />
              </div>
              <div className="d-flex flex-column">
                <Text strong>{product.name}</Text>
                <Text>{toCurrency(product.price)}</Text>
              </div>
            </div>
            <Text strong>{product.sold} sold</Text>
          </div>
        );
      },
    },
  ];

  return (
    <Card>
      <Title level={3}>Top Products</Title>
      <Table
        rowKey={() => {
          id++;
          return id;
        }}
        showHeader={false}
        columns={columns}
        dataSource={products}
        pagination={false}
      />
    </Card>
  );
}
