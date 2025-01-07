import React, { useEffect, useState } from "react";
import { notification, Form, Input, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserData } from "../api/adminAPI";
import { User, UserRequest } from "../constants/interfaces";

const EditUser: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [originalUserData, setOriginalUserData] = useState<UserRequest>({
    username: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (!userId) return;

    getUserById(+userId)
      .then((user: User) => {
        form.setFieldsValue({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
        setOriginalUserData({
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
      })
      .catch((error) => {
        console.error("Ошибка при получении пользователя:", error);
        notification.error({ message: "Не удалось загрузить пользователя" });
      });
  }, [userId]);

  const handleFinish = async (currentValues: UserRequest) => {
    if (!userId) return;

    const newUserData: UserRequest = {};
    Object.keys(currentValues).forEach((field) => {
      const typedField = field as keyof UserRequest;
      if (currentValues[typedField] !== originalUserData[typedField]) {
        newUserData[typedField] = currentValues[typedField];
      }
    });

    if (Object.keys(newUserData).length === 0) {
      notification.info({ message: "Нет изменений для обновления" });
      return;
    }

    try {
      await updateUserData(+userId, newUserData);
      notification.success({
        message: `Данные пользователя c id:${userId} изменены`,
      });
      navigate("/users");
    } catch (error) {
      console.error("Ошибка при редактировании данных пользователя:", error);
      notification.error({
        message: "Ошибка при редактировании данных пользователя",
      });
    }
  };

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 600,
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <h2>Редактирование данных пользователя #{userId}</h2>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Имя"
          name="username"
          rules={[
            { required: true, message: "Введите имя пользователя!" },
            { pattern: /^[a-zA-Zа-яА-Я]+$/, message: "Только буквы!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Введите корректный email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Номер телефона"
          name="phoneNumber"
          rules={[{ pattern: /^\+?\d{10,15}$/, message: "Неверный формат!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ margin: "10px" }}>
            Сохранить
          </Button>
          <Button onClick={() => navigate("/users")}>Отмена</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
