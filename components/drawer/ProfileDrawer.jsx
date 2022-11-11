import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Image,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import getProfileImg from "../../helper/client/getProfileImage";
import { logout } from "../../store/functions/authFunction";
import { useState } from "react";
import AccountSettings from "./accountSettings/AccountSettings";

const { Text } = Typography;

const Profile = ({ isOpen, setOpen }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [open, setOpened] = useState(false);

  const onLogout = () => {
    setOpen(!isOpen);
    logout(dispatch);
  };

  const footer = () => {
    return (
      <div className="d-flex justify-content-end">
        <Space align="center">
          <Button
            type="primary"
            className="d-flex align-items-center"
            onClick={() => setOpened(true)}
          >
            <SettingOutlined />
            <span>Account Settings</span>
          </Button>
          <Button
            type="primary"
            danger
            className="d-flex align-items-center"
            onClick={onLogout}
          >
            <LogoutOutlined />
            <span>Logout</span>
          </Button>
        </Space>
      </div>
    );
  };

  return (
    <>
      <Drawer
        title="Profile"
        placement="right"
        onClose={() => setOpen(!isOpen)}
        open={isOpen}
        footer={footer()}
      >
        <div className="text-center">
          <Space direction="vertical">
            <div>
              <Avatar
                size={120}
                icon={<Image src={getProfileImg(user.image)} />}
              />
            </div>
            <div>
              <Text strong>{`${user.first_name} ${user.last_name}`}</Text>
            </div>
            <div>
              {user.is_verified ? (
                <Tag color={user.is_active ? "green" : "red"}>
                  {user.is_active ? "Active" : "Deactived"}
                </Tag>
              ) : null}
              <Tag color={user.is_verified ? "green" : "red"}>
                {user.is_verified ? "Verified" : "Unverified"}
              </Tag>
            </div>
          </Space>
        </div>

        <Divider />

        <Row justify="space-between">
          <Col span={8}>
            <div className="d-flex justify-content-between">
              <Text strong>Username</Text>
              <Text strong>:</Text>
            </div>
            <div className="d-flex justify-content-between">
              <Text strong>Email</Text>
              <Text strong>:</Text>
            </div>
            <div className="d-flex justify-content-between">
              <Text strong>Registered</Text>
              <Text strong>:</Text>
            </div>
          </Col>
          <Col span={15}>
            <div>
              <Text>{user.username}</Text>
            </div>
            <div>
              <Text>{user.email}</Text>
            </div>
            <div>
              <Text>{moment(user.created_at).format("DD MMMM YYYY")}</Text>
            </div>
          </Col>
        </Row>
      </Drawer>

      <AccountSettings open={open} setOpened={setOpened} />
    </>
  );
};

export default Profile;
