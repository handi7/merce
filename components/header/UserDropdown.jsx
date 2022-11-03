import { Menu, message } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const UserMenu = (dispatch) => {
  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      return logout(dispatch);
    }

    // Router.push(key);
    message.success(key);
  };

  return (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          label: (
            <div className="d-flex align-items-center">
              <UserOutlined />
              <span className="ms-2">Profile</span>
            </div>
          ),
          key: "/profile",
        },
        {
          type: "divider",
        },
        {
          label: (
            <div className="d-flex align-items-center">
              <LogoutOutlined />
              <span className="text-danger ms-2">Logout</span>
            </div>
          ),
          key: "logout",
        },
      ]}
    />
  );
};

export default UserMenu;
