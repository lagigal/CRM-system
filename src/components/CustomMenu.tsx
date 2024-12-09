import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const CustomMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false); // Состояние для сворачивания бокового меню
  const location = useLocation();

  const items = [
    {
      label: <Link to="/">Список задач</Link>,
      key: "/", // Ключ для идентификации текущего маршрута
      icon: <PieChartOutlined />,
    },
    {
      label: <Link to="/profile">Профиль</Link>,
      key: "/profile",
      icon: <UserOutlined />,
    }
  ];

  return (
    <Layout  style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{paddingTop: 64}}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]} 
          items={items}
        />
      </Sider>
    </Layout>
  );
};

export default CustomMenu;

