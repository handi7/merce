import { Button, Card, Image, List, Tag, Typography } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import getProductImg from "../../helper/client/getProductImage";
import { addToCart } from "../../store/actions/CartAction";
import toCurrency from "../../helper/client/toCurrency";

const { Text } = Typography;

export default function ProductCardTable({ products }) {
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
          <Card className="shadow border rounded">
            <div style={{ height: "390px" }} className="d-flex flex-column ">
              <Image
                style={{ objectFit: "contain" }}
                src={getProductImg(product.image)}
                height={300}
              />
              <div className="d-flex flex-column justify-content-end h-100">
                <span>{product.category}</span>
                <Text strong>{product.name}</Text>
                <div className="d-flex justify-content-between">
                  <Text strong className="text-success">
                    {toCurrency(product.price)}
                  </Text>

                  <Button
                    type="primary"
                    size="small"
                    className="rounded"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => onBtnAdd(product.id)}
                  ></Button>
                </div>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
}
