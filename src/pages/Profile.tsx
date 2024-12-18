import { Layout } from "antd";
import CustomMenu from "../components/CustomMenu";
import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "../store";
import { userProfileThunk, selectUser } from "../slices/userSlice";
import { useEffect } from "react";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userProfileThunk());
  }, [dispatch]);

  const userData = useSelector(selectUser);
  
  return (
    <>
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
      >
        <CustomMenu />
        <Layout style={{ margin: "20px", width: "100%" }}>
          <Content
            style={{
              width: "100%",
              padding: 24,
              background: "#fff",
              borderRadius: 8,
              minHeight: "calc(100vh - 32px)",
              margin: "0 auto",
            }}
          >
            <div style={{ color: "black" }}><h1>Профиль пользователя</h1>
            {userData ? (
              <div>
                <p>Имя: {userData.username}</p>
                <p>Email: {userData.email}</p>
                <p>номер: {userData.phoneNumber}</p>
              </div>
            ) : (
              <p>Загрузка данных...</p>
            )}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Profile;
