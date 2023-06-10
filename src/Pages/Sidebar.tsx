import React, { useState } from "react";
import "../Style/Sidebar.css";
import { Link } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const parent = (label: string) => {
  return <p className="parent">{label}</p>;
};

const element = (label: string, route: string) => {
  return (
    <Link to={route}>
      <p className="option">{label}</p>
    </Link>
  );
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(parent("Movies"), "sub1", <AppstoreOutlined className="icon" />, [
    getItem(element("Latest", "/movie/latest"), "1"),
    getItem(element("Popular", "/movie/popular"), "2"),
    getItem(element("Top Rated", "/movie/top_rated"), "3"),
  ]),
  getItem(parent("TV Series"), "sub2", <AppstoreOutlined className="icon" />, [
    getItem(element("Latest", "/tv/latest"), "4"),
    getItem(element("Popular", "/tv/popular"), "5"),
    getItem(element("Top Rated", "/tv/top_rated"), "6"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Sidebar: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <div className="side_outer">
      <Menu
        mode="inline"
        // openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 250 }}
        items={items}
        className="sidebar"
      />
    </div>
  );
};

export default Sidebar;
