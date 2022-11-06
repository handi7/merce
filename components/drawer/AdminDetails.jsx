import {
  Avatar,
  Button,
  Col,
  Divider,
  Drawer,
  Image,
  message,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import getProfileImg from "../../helper/client/getProfileImage";
import axios from "axios";
import { API_URL } from "../../lib/constants";
import { useState } from "react";

const { Text } = Typography;

const AdminDetails = ({ admin, isOpen, onClose }) => {
  const [isLoading, setLoading] = useState(false);

  const resendMail = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `${API_URL}/admins/resendVerification`,
        admin
      );

      setLoading(false);
      if (!response.data) {
        return message.error("Server error!");
      }
      message.success("Email sent!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer
      title="Admin Information"
      placement="right"
      onClose={() => onClose("details")}
      open={isOpen}
      footer={
        <div className="d-flex justify-content-end">
          {admin.is_verified ? (
            <Button type="primary" danger={admin.is_active ? true : false}>
              {admin.is_active ? (
                <div className="d-flex align-items-center">
                  <ExclamationCircleOutlined className="me-2" />
                  <span>Deactivate Account</span>
                </div>
              ) : (
                <div className="d-flex align-items-center">
                  <CheckCircleOutlined className="me-2" />
                  <span>Activate Account</span>
                </div>
              )}
            </Button>
          ) : (
            <Button type="link" loading={isLoading} onClick={resendMail}>
              Resend Email
            </Button>
          )}
        </div>
      }
    >
      <div className="text-center">
        <Space direction="vertical">
          <div>
            <Avatar
              size={120}
              icon={<Image src={getProfileImg(admin.image)} />}
            />
          </div>
          <div>
            <Text strong>{`${admin.first_name} ${admin.last_name}`}</Text>
          </div>
          <div>
            {admin.is_verified ? (
              <Tag color={admin.is_active ? "green" : "red"}>
                {admin.is_active ? "Active" : "Deactived"}
              </Tag>
            ) : null}
            <Tag color={admin.is_verified ? "green" : "red"}>
              {admin.is_verified ? "Verified" : "Unverified"}
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
            <Text>{admin.username}</Text>
          </div>
          <div>
            <Text>{admin.email}</Text>
          </div>
          <div>
            <Text>{moment(admin.created_at).format("DD MMMM YYYY")}</Text>
          </div>
        </Col>
      </Row>
    </Drawer>
  );
};

export default AdminDetails;
