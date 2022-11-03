import { Button, Card, Image, List } from "antd";
import React from "react";
import getProductImg from "../../../helper/client/getProductImage";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../store/actions/CartAction";

export default function CardList({ products }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onBtnAdd = async (product_id) => {
    addToCart(user.id, product_id, 1, dispatch);
  };

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
              <Button
                type="primary"
                size="small"
                className="rounded"
                onClick={() => onBtnAdd(product.id)}
              >
                <ShoppingCartOutlined />
              </Button>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
