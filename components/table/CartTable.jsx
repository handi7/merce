import {
  Button,
  Col,
  Image,
  InputNumber,
  Modal,
  Row,
  Table,
  Tooltip,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { deleteCart, updateCart } from "../../store/actions/CartAction";
import getProductImg from "../../helper/client/getProductImage";
import toCurrency from "../../helper/client/toCurrency";

const CartTable = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [qty, setQty] = useState({});

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onBtnDelete = (item) => {
    setDeleteItem(item);
    setOpen(true);
  };

  const onDelete = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      deleteCart(user.id, deleteItem.id, dispatch);
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const onCancel = () => {
    setOpen(false);
    setDeleteItem({});
  };

  const onInputQtyChange = (val, id) => {
    if (val) {
      setQty({ ...qty, [id]: val });
      return updateCart(user.id, id, val, dispatch);
    }
    setQty({ ...qty, [id]: 1 });
    updateCart(user.id, id, 1, dispatch);
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <Row>
            <Col span={4}>
              <Image
                height={50}
                src={getProductImg(item.image)}
                alt="product"
              />
            </Col>
            <Col span={20}>
              <span key={item.id}>{item.name}</span>
            </Col>
          </Row>
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, item) => {
        return <span key={item.id}>{toCurrency(item.price)}</span>;
      },
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (_, item) => {
        // <span key={item.id}>{item.qty}</span>
        return (
          <InputNumber
            style={{ width: "70px" }}
            min={1}
            max={item.stock}
            value={qty[item.id]}
            defaultValue={item.qty}
            onChange={(val) => onInputQtyChange(val, item.id)}
          />
        );
      },
      sorter: (a, b) => a.qty - b.qty,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, item) => (
        <span key={item.id}>{toCurrency(item.price * item.qty)}</span>
      ),
      sorter: (a, b) => a.price * a.qty - b.price * b.qty,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      key: "action",
      render: (_, item) => (
        <Tooltip title="delete">
          <Button
            type="danger"
            size="small"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onBtnDelete(item)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Table
        className="mt-2"
        columns={columns}
        dataSource={cart}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Delete item"
        open={open}
        onOk={onDelete}
        okType="danger"
        okText="Delete"
        confirmLoading={confirmLoading}
        onCancel={onCancel}
      >
        <div className="text-center">
          <DeleteOutlined
            className="text-danger mb-3"
            style={{ fontSize: "40px" }}
          />
          <p>Delete {deleteItem.name}?</p>
        </div>
      </Modal>
    </>
  );
};

export default CartTable;
