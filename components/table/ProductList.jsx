import {
  Button,
  Col,
  Image,
  Menu,
  Modal,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import {
  ShoppingCartOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import getProductImg from "../../helper/client/getProductImage";
import toCurrency from "../../helper/client/toCurrency";
import { addToCart } from "../../store/actions/CartAction";
import { useDispatch, useSelector } from "react-redux";
import EllipsisDropdown from "../EllipsisDropdown";
import EditProduct from "../drawer/EditProduct";
import AddStock from "../drawer/AddStock";
import axios from "axios";
import { API_URL } from "../../lib/constants";

const { Text } = Typography;

export default function ProductList({ products, getProducts }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [selectedProduct, setProduct] = useState({});
  const [modal, setmodal] = useState({ detail: false, delete: false });
  const [isEdit, setEdit] = useState({ product: false, stock: false });

  const onEdit = (type, product) => {
    setProduct(product);
    setEdit({ ...isEdit, [type]: true });
  };

  const onCancelEdit = () => {
    setProduct({});
    setEdit({ product: false, stock: false });
  };

  const showModal = (type, product) => {
    setProduct(product);
    setmodal({ ...modal, [type]: true });
  };

  const handleOk = () => {
    addToCart(user.id, selectedProduct.id, 1, dispatch);
    setmodal({ ...modal, detail: false });
    setProduct({});
  };

  const handleCancel = (type) => {
    setmodal({ ...modal, [type]: false });
    setProduct({});
  };

  const onDelete = async () => {
    try {
      await axios.patch(`${API_URL}/products/delete`, {
        id: selectedProduct.id,
      });
      setmodal({ ...modal, delete: false });
      setProduct({});
      getProducts("");
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownMenu = (product) => (
    <Menu>
      <Menu.Item key={1} onClick={() => showModal("detail", product)}>
        <div className="d-flex align-items-center">
          <EyeOutlined />
          <span className="ms-2">View Details</span>
        </div>
      </Menu.Item>

      <Menu.Item
        key={2}
        onClick={() => addToCart(user.id, product.id, 1, dispatch)}
      >
        <div className="d-flex align-items-center">
          <ShoppingCartOutlined />
          <span className="ms-2">Add to Cart</span>
        </div>
      </Menu.Item>

      <Menu.Item key={3} onClick={() => onEdit("product", product)}>
        <div className="d-flex align-items-center">
          <EditOutlined />
          <span className="ms-2">Update</span>
        </div>
      </Menu.Item>

      <Menu.Item key={4} onClick={() => onEdit("stock", product)}>
        <div className="d-flex align-items-center">
          <EditOutlined />
          <span className="ms-2">Add Stock</span>
        </div>
      </Menu.Item>

      <Menu.Item key={5} onClick={() => showModal("delete", product)}>
        <div className="d-flex align-items-center text-danger">
          <DeleteOutlined />
          <span className="ms-2">Delete</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, product) => {
        return (
          <div
            style={{ cursor: "pointer" }}
            className="d-flex"
            onClick={() => showModal(product)}
          >
            <div style={{ width: "80px" }}>
              <Image
                className="p-2"
                src={getProductImg(product.image)}
                height={50}
                alt="product"
              />
            </div>
            <Text strong>{product.name}</Text>
          </div>
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
      render: (_, product) => <span>{toCurrency(product.price)}</span>,
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (_, product) => {
        return <span>{`${product.stock} ${product.unit}`}</span>;
      },
      sorter: (a, b) => a.stock - b.stock,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "",
      key: "action",
      render: (_, product) => {
        return (
          <div className="text-right">
            <EllipsisDropdown menu={dropdownMenu(product)} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={products}
        pagination={{ pageSize: 10 }}
      />

      <EditProduct
        product={selectedProduct}
        isEdit={isEdit.product}
        onCancel={onCancelEdit}
        getProducts={getProducts}
      />

      <AddStock
        product={selectedProduct}
        isEdit={isEdit.stock}
        onCancel={onCancelEdit}
        getProducts={getProducts}
      />

      <Modal
        okText="Delete"
        okType="danger"
        // cancelText="Close"
        open={modal.delete}
        onOk={onDelete}
        onCancel={() => handleCancel("delete")}
        closable={false}
      >
        <div className="d-flex flex-column text-center">
          <div>
            <Image
              src={getProductImg(selectedProduct.image)}
              height={150}
              preview={false}
            />
          </div>
          <Text strong>Delete {selectedProduct.name}?</Text>
        </div>
      </Modal>

      <Modal
        title="Product Details"
        width={1000}
        okText="Add to Cart"
        cancelText="Close"
        open={modal.detail}
        onOk={handleOk}
        onCancel={() => handleCancel("detail")}
      >
        <Row>
          <Col span={11}>
            <Image src={getProductImg(selectedProduct.image)} preview={false} />
          </Col>
          <Col span={12} offset={1}>
            <Row>
              <Col span={24} className="d-flex flex-column mb-4">
                <label>Name:</label>
                <Text strong>{selectedProduct.name}</Text>
              </Col>

              <Col span={12} className="d-flex flex-column mb-4">
                <label>Price:</label>
                <Text strong>{selectedProduct.price}</Text>
              </Col>

              <Col span={12} className="d-flex flex-column mb-4">
                <label>General Price:</label>
                <Text strong>{selectedProduct.general_price}</Text>
              </Col>

              <Col span={12} className="d-flex flex-column mb-4">
                <label>Stock:</label>
                <Text strong>{selectedProduct.stock}</Text>
              </Col>

              <Col span={12} className="d-flex flex-column mb-4">
                <label>Unit:</label>
                <Text strong>{selectedProduct.unit}</Text>
              </Col>

              <Col span={12} className="d-flex flex-column mb-4">
                <label>Per Pkg:</label>
                <Text
                  strong
                >{`${selectedProduct.per_pkg} ${selectedProduct.unit}`}</Text>
              </Col>

              <Col span={12} className="d-flex flex-column mb-4">
                <label>Stock(Pkg):</label>
                <Text strong>{`${selectedProduct.stock_pkg} pkg`}</Text>
              </Col>

              <Col span={24} className="d-flex flex-column">
                <label>Description:</label>
                <Text strong>{selectedProduct.description}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
