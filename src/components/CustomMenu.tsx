import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { userLogout } from "../api/baseAPI";

const { Sider } = Layout;

const CustomMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleLogoutOk = async () => {
    try {
      await userLogout();
      navigate("/login"); // Перенаправляем на страницу логина
    } catch (error) {
      console.error("Ошибка логаута:", error);
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleLogoutCancel = () => {
    setIsModalVisible(false);
  };

  const items = [
    {
      label: <Link to="/">Список задач</Link>,
      key: "/", // Ключ для идентификации текущего маршрута
      icon: <UnorderedListOutlined />,
    },
    {
      label: <Link to="/profile">Профиль</Link>,
      key: "/profile",
      icon: <UserOutlined />,
    },
    {
      onClick: showLogoutModal,
      label: "Выйти",
      key: "/login",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ paddingTop: 64 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Modal
        title="Подтверждение выхода"
        open={isModalVisible} 
        onOk={handleLogoutOk}
        onCancel={handleLogoutCancel}
        okText="Да, выйти"
        cancelText="Отмена"
      >
        <p>Вы действительно хотите выйти из системы?</p>
      </Modal>
    </Layout>
  );
};

export default CustomMenu;
