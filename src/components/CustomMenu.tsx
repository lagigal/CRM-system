import React, { useState } from "react";
import { Layout, Menu, Modal } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "../store";
import { logoutUserThunk, selectUser } from "../slices/userSlice";

const { Sider } = Layout;

const CustomMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showLogoutModal = () => {
    setIsModalVisible(true);
  };

  const handleLogoutOk = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        setIsModalVisible(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Ошибка логаута:", error);
      });
  };

  const handleLogoutCancel = () => {
    setIsModalVisible(false);
  };

  const isAdmin = useSelector(selectUser)?.isAdmin;

  const items = isAdmin
    ? [
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
          label: <Link to="/users">Пользователи</Link>,
          key: "/users",
          icon: <UsergroupAddOutlined />,
        },
        {
          onClick: showLogoutModal,
          label: "Выйти",
          key: "/login",
          icon: <LogoutOutlined />,
        },
      ]
    : [
        {
          label: <Link to="/">Список задач</Link>,
          key: "/",
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
