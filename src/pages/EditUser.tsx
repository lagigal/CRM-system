import React, { useEffect, useState, ChangeEvent } from "react";
import { notification, Form, Input, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUserData } from "../api/baseAPI";
import { User, UserRequest } from "../constants/interfaces";

const EditUser: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [userNameInput, setUserNameInput] = useState("");
  const [userMailInput, setUserMailInput] = useState("");
  const [userPhoneInput, setUserPhoneInput] = useState("");
  const [originalUserData, setOriginalUserData] = useState<UserRequest>({
    username: "",
    email: "",
    phoneNumber: ""
  });

  useEffect(() => {
    if (!userId) return;
    
    getUserById(+userId).then((user: User) => {
      setUserNameInput(user.username);
      setUserMailInput(user.email);
      setUserPhoneInput(user.phoneNumber);
      setOriginalUserData({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber
      });
    }).catch((error) => {
      console.error("Ошибка при получении пользователя:", error);
      notification.error({ message: "Не удалось загрузить пользователя" });
    });
  }, [userId]);

  const handleChangeuserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameInput(e.target.value);
  };
  const handleChangeuserMailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMailInput(e.target.value);
  };
  const handleChangeuserPhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPhoneInput(e.target.value);
  };

  const handleChangeUserData = async () => {
    if (!userId) return;

    const newUserData: UserRequest = {};

    if (userNameInput !== originalUserData.username) {
      newUserData.username = userNameInput;
    }
    if (userMailInput !== originalUserData.email) {
      newUserData.email = userMailInput;
    }
    if (userPhoneInput !== originalUserData.phoneNumber) {
      newUserData.phoneNumber = userPhoneInput;
    }

    if (Object.keys(newUserData).length === 0) {
      notification.info({ message: "Нет изменений для обновления" });
      return;
    }

    try {
      await updateUserData(+userId, newUserData);
      notification.success({
        message: `Данные пользователя c id:${userId} изменены`
      });
      navigate("/users");
    } catch (error) {
      console.error("Ошибка при редактировании данных пользователя:", error);
      notification.error({
        message: "Ошибка при редактировании данных пользователя"
      });
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, display: "flex",
        flexDirection: "column", margin: "0 auto" }}>
      <h2>Редактирование данных пользователя #{userId}</h2>

      <Form layout="vertical" >
        <Form.Item label="Имя">
          <Input value={userNameInput} onChange={handleChangeuserNameInput} />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={userMailInput} onChange={handleChangeuserMailInput} />
        </Form.Item>
        <Form.Item label="Номер телефона">
          <Input value={userPhoneInput} onChange={handleChangeuserPhoneInput} />
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleChangeUserData}>
        Сохранить
      </Button>
      &nbsp;
      <Button onClick={() => navigate("/users")}>
        Отмена
      </Button>
    </div>
  );
};

export default EditUser;
