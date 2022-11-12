import { Avatar, Button, Divider, Form, Image, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getProfileImg from "../../../helper/client/getProfileImage";
import { API_URL } from "../../../lib/constants";
import { getProfile } from "../../../store/functions/authFunction";

export default function AccountTabs({ id, open, setOpened }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [image, setImage] = useState({ file: null, preview: "" });
  const [isLoading, setLoading] = useState(false);

  const initVal = {
    first_name: user.first_name,
    last_name: user.last_name,
    username: user.username,
  };

  const onFinish = async (values) => {
    if (!values && !image.file) return setOpened(!open);

    setLoading(true);
    let formData = new FormData();
    if (image.file) {
      formData.append("id", user.id);
      formData.append("file", image.file);
      formData.append("oldImg", user.image);
      if (values) {
        for (const key in values) {
          if (values[key] === user[key]) {
            delete values[key];
            continue;
          }
          formData.append(key, values[key]);
        }
      }
    } else {
      values.id = user.id;
    }

    let response = {};
    if (image.file) {
      response = await axios.patch(
        `${API_URL}/admins/updateProfileNImg`,
        formData
      );
    } else {
      response = await axios.patch(`${API_URL}/admins/updateProfile`, values);
    }

    if (response.data.message) {
      setLoading(false);
      return message.error(response.data.message);
    }
    message.success("Profile updated.");
    setLoading(false);
    getProfile(dispatch, user.id);
    setOpened(!open);
  };

  const onSubmitPassword = async (values) => {
    values.id = user.id;
    setLoading(true);
    const res = await axios.patch(`${API_URL}/admins/changePassword`, values);
    if (res.data.message) {
      setLoading(false);
      return message.error(res.data.message);
    }
    message.success("Password updated!");
    setLoading(false);
    setOpened(!open);
  };

  const onInputImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({ file, preview: URL.createObjectURL(file) });
    }
  };

  if (id === 1) {
    return (
      <>
        <div className="text-center">
          <div>
            <label htmlFor="inputImg">
              <Avatar
                style={{ cursor: "pointer" }}
                size={120}
                icon={
                  image.preview || user.image ? (
                    <Image
                      preview={false}
                      style={{ objectFit: "cover" }}
                      src={
                        image.preview
                          ? image.preview
                          : getProfileImg(user.image)
                      }
                    />
                  ) : (
                    <UserOutlined />
                  )
                }
              />
            </label>
            <input
              type="file"
              id="inputImg"
              className="d-none"
              onChange={onInputImg}
            />
          </div>
        </div>

        <Divider />
        <Form layout="vertical" onFinish={onFinish} initialValues={initVal}>
          <Form.Item label="First Name" name="first_name">
            <Input placeholder="First Name" />
          </Form.Item>

          <Form.Item label="Last Name" name="last_name">
            <Input placeholder="Last Name" />
          </Form.Item>

          <Form.Item label="Username" name="username">
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }

  return (
    <Form layout="vertical" onFinish={onSubmitPassword}>
      <Form.Item
        label="Current Password"
        name="currentPassword"
        rules={[{ required: true, message: "Please input current password!" }]}
      >
        <Input.Password placeholder="Current Password" />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          { required: true, message: "Please input new password" },
          {
            pattern: new RegExp(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            ),
            message:
              "Min 8 char. included uppercase & lowercase letter, number, and symbol.",
          },
        ]}
      >
        <Input.Password placeholder="New Password" />
      </Form.Item>

      <Form.Item
        label="Repeat New Password"
        name="repeat"
        rules={[
          { required: true, message: "Please repeat new password" },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password placeholder="Repeat Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" loading={isLoading}>
          Save Password
        </Button>
      </Form.Item>
    </Form>
  );
}
