import { Layout } from "antd"
import CustomMenu from "../components/CustomMenu"
import { Content } from "antd/es/layout/layout"

const Profile: React.FC = () => {
    return (<>
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
    >
    <CustomMenu />
    <Layout style={{margin: "20px", width: "100%"}}>
    <Content style={{
            width: "100%",
            padding: 24,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 32px)",
            margin: "0 auto"
          }}>
    <div style={{color: "black"}}>Профиль пользователя</div>
    </Content>
    </Layout>
    </Layout>
    </>)
}

export default Profile