import { Image, Table } from "antd";
import React from "react";
import getProductImg from "../../../helper/client/getProductImage";
import toCurrency from "../../../helper/client/toCurrency";

export default function List({ products }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      //   key: "name",
      //   width: "30%",
      render: (_, product) => {
        return (
          <>
            <Image
              className="p-2"
              src={getProductImg(product.image)}
              // width={100}
              height={50}
              alt="product"
            />
            <span>{product.name}</span>
          </>
        );
      },
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (_, product) => {
        return <span>{product.category}</span>;
      },
      sorter: {
        compare: (a, b) => {
          a = a.category.toLowerCase();
          b = b.category.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      //   key: "age",
      //   width: "20%",
      render: (_, product) => <span>{toCurrency(product.price)}</span>,
      //   ...getColumnSearchProps("age"),
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (_, product) => <span>{product.stock}</span>,
      //   ...getColumnSearchProps("address"),
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 10 }}
    />
  );
}
