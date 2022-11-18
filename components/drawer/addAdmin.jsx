import { Button, Drawer, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";

export default function AddAdmin({ isOpen, onClose, getAdmins }) {
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      if (!values.last_name) {
        values.last_name = "";
      }

      await axios.post(`/api/admins/addAdmin`, values);

      setLoading(false);
      message.success(
        `${values.first_name} successfully added as admin and verification mail sent to ${values.email}`
      );
      getAdmins();
    } catch (error) {
      if (error.response.status === 400) {
        message.error(error.response.data);
      }
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Drawer
      title="Add New Admin"
      placement="right"
      onClose={() => onClose("add")}
      open={isOpen}
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
