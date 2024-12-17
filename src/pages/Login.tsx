import { Button, Form, FormProps, Input, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { useDispatch } from "../store";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/autorisation.webp";
import { loginUserThunk } from "../slices/userSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type FieldType = {
    login: string;
    password: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(loginUserThunk(values))
      .unwrap()
      .then(() => {
        notification.success({
          message: "Успешный вход!",
          description: "Вы успешно вошли в систему! Перенаправляем на главную.",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Ошибка входа:", error);
        notification.error({
          message: "Ошибка входа",
          description: error.message || "Что-то пошло не так. Попробуйте снова.",
        });
      });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          gap: "40px",
          background: "#f0f2f5",
        }}
      >
        {/* Блок с изображением */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={authImage}
            alt="Auth"
            style={{
              width: "100%",
              maxWidth: "500px", 
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>

        {/* Блок с формой */}
        <div
          style={{
            minWidth: "500px",
            background: "#fff",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Вход</h2>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Логин"
              name="login"
              rules={[
                { required: true, message: "Пожалуйста, введите логин!" },
                {
                  min: 2,
                  max: 60,
                  message: "Логин должен содержать от 2 до 60 символов!",
                },
                {
                  pattern: /^[a-zA-Z]+$/,
                  message: "Только латинские буквы!",
                },
              ]}
            >
              <Input placeholder="Введите логин" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
                {
                  min: 6,
                  max: 60,
                  message: "Пароль должен содержать от 6 до 60 символов!",
                },
              ]}
            >
              <Input.Password placeholder="Введите пароль" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Войти
              </Button>
            </Form.Item>
          </Form>

          <p style={{ textAlign: "center" }}>
            Нет аккаунта?{" "}
            <Link to="/registration" style={{ fontWeight: "bold" }}>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
