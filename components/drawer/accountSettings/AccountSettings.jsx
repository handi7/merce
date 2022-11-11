import { Drawer, Tabs } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import AccountTabs from "./Tabs";

const AccountSettings = ({ open, setOpened }) => {
  return (
    <Drawer
      title="Account Settings"
      placement="right"
      onClose={() => setOpened(!open)}
      open={open}
    >
      <Tabs
        defaultActiveKey="2"
        items={[UserOutlined, KeyOutlined].map((Icon, i) => {
          const id = i + 1;
          return {
            label: (
              <span>
                <Icon />
                {id === 1 ? "Profile" : "Change Password"}
              </span>
            ),
            key: id,
            children: <AccountTabs id={id} open={open} setOpened={setOpened} />,
          };
        })}
      />
    </Drawer>
  );
};

export default AccountSettings;
