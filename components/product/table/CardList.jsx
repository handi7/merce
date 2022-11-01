import { Card, Image, List } from "antd";
import React from "react";
import getProductImg from "../../../helper/client/getProductImage";

export default function CardList({ products }) {
  return (
    <List
      grid={{
        gutter: 16,
        column: 4,
      }}
      pagination={{ pageSize: 12 }}
      dataSource={products}
      renderItem={(product) => (
        <List.Item>
          <Card>
            {/* <div className="w-100 h-50"> */}
            <Image src={getProductImg(product.image)} height={200} />
            {/* </div> */}
            <div>
              <span>{product.name}</span>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
