import {
  BarChartOutlined,
  ShoppingOutlined,
  TagsOutlined,
  UserOutlined,
  ShoppingCartOutlined,
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
    key: "/cart",
    icon: <ShoppingCartOutlined />,
    label: "Cart",
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
