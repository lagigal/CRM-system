import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import Sider from "antd/es/layout/Sider";

const CustomMenu: React.FC = () => {
  const location = useLocation(); 

  return (
    <Layout style={{ position: "absolute", top: "20px", right: "30px" }}>
      <Sider>
        <Menu mode="inline" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Список задач</Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">Профиль</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default CustomMenu;
