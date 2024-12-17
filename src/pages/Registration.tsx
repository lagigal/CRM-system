import { Button, Form, FormProps, Input, Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { registerUserThunk } from "../slices/userSlice";
import { useDispatch } from "../store";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/autorisation.webp";

const Registration: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type FieldType = {
    login: string;
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(registerUserThunk(values))
      .unwrap()
      .then(() => {
        notification.success({
          message: "Регистрация успешна",
          description: "Вы успешно зарегистрировались! Перенаправляем на вход.",
        });
        navigate("/login");
      })
      .catch((error) => {
        notification.error({
          message: "Ошибка регистрации",
          description: error.message || "Попробуйте снова.",
        });
      });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Content
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Блок изображения */}
        <div style={{ display: "none", flex: 1 }}>
          <img
            src={authImage}
            alt="Auth"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Форма */}
        <div style={{ flex: 1, maxWidth: "400px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Регистрация
          </h2>
          <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Имя пользователя"
              name="username"
              rules={[
                { required: true, message: "Введите имя пользователя!" },
                { pattern: /^[a-zA-Zа-яА-Я]+$/, message: "Только буквы!" },
              ]}
            >
              <Input placeholder="Ваше имя" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Логин"
              name="login"
              rules={[{ required: true, message: "Введите логин!" }]}
            >
              <Input placeholder="Логин" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, type: "email", message: "Введите корректный email!" }]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Введите пароль!" },
                { min: 6, message: "Минимум 6 символов!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Повторите пароль"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Повторите пароль!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Пароли не совпадают!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Телефон"
              name="phoneNumber"
              rules={[
                { pattern: /^\+?\d{10,15}$/, message: "Неверный формат!" },
              ]}
            >
              <Input placeholder="+7XXXXXXXXXX" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: "center" }}>
            Уже есть аккаунт?{" "}
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Войти
            </Link>
          </p>
        </div>
      </Content>
    </Layout>
  );
};

export default Registration;
