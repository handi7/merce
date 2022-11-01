import {
  BarChartOutlined,
  ShoppingOutlined,
  TagsOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const menuData = [
  {
    key: "/",
    icon: <BarChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "/products",
    icon: <TagsOutlined />,
    label: "Products",
  },
  {
    key: "/orders",
    icon: <ShoppingOutlined />,
    label: "Orders",
  },
  {
    key: "/admins",
    icon: <UserOutlined />,
    label: "Admins",
  },
];
