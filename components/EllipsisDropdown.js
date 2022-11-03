import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined, MoreOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const EllipsisDropdown = (props) => {
  return (
    <Dropdown
      overlay={props.menu}
      placement={props.placement}
      trigger={["click"]}
    >
      <Button
        type="dashed"
        size="small"
        icon={<MoreOutlined />}
        shape="circle"
      />
    </Dropdown>
  );
};

EllipsisDropdown.propTypes = {
  trigger: PropTypes.string,
  placement: PropTypes.string,
};

EllipsisDropdown.defaultProps = {
  trigger: "click",
  placement: "bottomRight",
  menu: <Menu />,
};

export default EllipsisDropdown;
