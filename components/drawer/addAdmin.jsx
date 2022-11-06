import { Button, Drawer, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../lib/constants";

export default function AddAdmin({ isOpen, onClose }) {
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const response = await axios.post(`${API_URL}/admins/addAdmin`, values);

    setLoading(false);
    if (!response.data) {
      return message.error("Server error!");
    }
    message.success(
      `${values.first_name} successfully added as admin and verification mail sent to ${values.email}`
    );
  };

  return (
    <Drawer
      title="Add New Admin"
      placement="right"
      onClose={() => onClose("add")}
      open={isOpen}
      // footer={
      //   <div className="d-flex justify-content-end">
      //     {admin.is_verified ? (
      //       <Button type="primary" danger={admin.is_active ? true : false}>
      //         {admin.is_active ? (
      //           <div className="d-flex align-items-center">
      //             <ExclamationCircleOutlined className="me-2" />
      //             <span>Deactivate Account</span>
      //           </div>
      //         ) : (
      //           <div className="d-flex align-items-center">
      //             <CheckCircleOutlined className="me-2" />
      //             <span>Activate Account</span>
      //           </div>
      //         )}
      //       </Button>
      //     ) : (
      //       <Button type="link">Resend Email</Button>
      //     )}
      //   </div>
      // }
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="First Name:"
          name="first_name"
          rules={[{ required: true, message: "Please input first name!" }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item label="Last Name:" name="last_name">
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          label="Email:"
          name="email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Add Admin
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
