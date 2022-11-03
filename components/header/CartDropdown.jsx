import { Button, Card, Divider, Image, Menu, Typography } from "antd";
import Router from "next/router";
import { useSelector } from "react-redux";
import getProductImg from "../../helper/client/getProductImage";
import toCurrency from "../../helper/client/toCurrency";

const { Text } = Typography;

export default function CartDropdown(cart) {
  const onBtnClick = () => {
    Router.push("/cart");
    // setOpen({ ...isOpen, cart: false });
  };

  return (
    <Card style={{ width: "300px" }}>
      <div className="d-flex justify-content-between">
        <Text strong>Cart</Text>
        <span>{`${cart.length} items`}</span>
      </div>

      <Divider />

      <div>
        {cart.slice(3).map((product) => {
          return (
            <div key={product.id}>
              <div className="d-flex">
                <div className="me-2">
                  <Image
                    src={getProductImg(product.image)}
                    height={50}
                    alt="product"
                  />
                </div>
                <div className="w-100">
                  <Text>{product.name}</Text>

                  <div className="d-flex justify-content-between">
                    <Text type="secondary">{`${product.qty} x ${toCurrency(
                      product.price
                    )}`}</Text>
                    <Text type="secondary">
                      {toCurrency(product.qty * product.price)}
                    </Text>
                  </div>
                </div>
              </div>
              {/* <Divider className="text-muted" plain>
                ---
            </Divider> */}
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="text-center">
        <Button onClick={onBtnClick} type="link">
          view all
        </Button>
      </div>
    </Card>
  );
}
