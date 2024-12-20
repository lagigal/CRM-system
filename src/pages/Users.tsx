import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Layout,
  notification,
  Input,
  Dropdown,
  MenuProps,
  Modal,
  Form,
  Pagination,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UnlockOutlined,
  LockOutlined,
  RightOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateUserData,
  updateUserRights,
} from "../api/baseAPI";
import { User, UserKeys, UserRequest } from "../constants/interfaces";
import CustomMenu from "../components/CustomMenu";
import { Content } from "antd/es/layout/layout";

const Users: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] =
    useState(false);
  const [isChangeUserDataModalVisible, setIsChangeUserDataModalVisible] =
    useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [userNameInput, setUserNameInput] = useState("");
  const [userMailInput, setUserMailInput] = useState("");
  const [userPhoneInput, setUserPhoneInput] = useState("");
  const [originalUserData, setOriginalUserData] = useState<UserRequest>({
    username: "",
    email: "",
    phoneNumber: "",
  });

  const [searchInput, setSearchInput] = useState("");
  const [sortByType, setSortByType] = useState<UserKeys>("id");
  const [sortOrderType, setSortOrderType] = useState<"ASC" | "DESC">("ASC");
  const [offsetNum, setOffsetNum] = useState(0);
  const [isBlockedType, setIsBlockedType] = useState<boolean | undefined>(
    undefined
  );

  const [limitOnPage, _] = useState<number>(20);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const fetchUsers = async () => {
    const fetchFilters = {
      search: searchInput,
      sortBy: sortByType,
      sortOrder: sortOrderType,
      isBlocked: isBlockedType,
      limit: limitOnPage,
      offset: offsetNum,
    };
    try {
      const response = await getUsers(fetchFilters);
      setUsersList(response.data);
      setTotalAmount(response.meta.totalAmount);
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchInput, sortByType, sortOrderType, offsetNum, isBlockedType]);

  //удаление пользоаателя////////////////////////////////
  const handleDeleteUser = async () => {
    if (selectedUserId === null) return;

    try {
      await deleteUser(selectedUserId);
      fetchUsers();
      notification.success({
        message: `Пользователсь c id:${selectedUserId} удален`,
      });
      setIsDeleteUserModalVisible(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      notification.error({ message: "Ошибка при удалении пользователя" });
    }
  };

  const showDeleteUserModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsDeleteUserModalVisible(true);
  };

  const handleDeleteUserCancel = () => {
    setIsDeleteUserModalVisible(false);
    setSelectedUserId(null);
  };

  //редактирование данных пользователя//////////////////////////////
  const showChangeUserDataModal = (record: User) => {
    setSelectedUserId(record.id);
    setIsChangeUserDataModalVisible(true);

    setUserNameInput(record.username);
    setUserMailInput(record.email);
    setUserPhoneInput(record.phoneNumber);

    setOriginalUserData({
      username: record.username,
      email: record.email,
      phoneNumber: record.phoneNumber,
    });
  };

  const handleChangeUserDataCancel = () => {
    setIsChangeUserDataModalVisible(false);
    setSelectedUserId(null);
  };

  const handleChangeUserData = async () => {
    if (selectedUserId === null) return;

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
      await updateUserData(selectedUserId, newUserData);
      fetchUsers();
      notification.success({
        message: `Данные пользователя c id:${selectedUserId} изменены`,
      });
      setIsChangeUserDataModalVisible(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Ошибка при редактировании данных пользователя:", error);
      notification.error({
        message: "Ошибка при редактировании данных пользователя",
      });
    }
  };

  const hendleChangeuserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserNameInput(e.target.value);
  };

  const hendleChangeuserMailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserMailInput(e.target.value);
  };

  const hendleChangeuserPhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPhoneInput(e.target.value);
  };

  //Блокировка пользователя////////////////////////////////////////////////////
  const handleBlockUser = async (id: number) => {
    try {
      await blockUser(id);
      fetchUsers();
      notification.success({
        message: `Пользователсь c id:${id} заблокирован`,
      });
    } catch (error) {
      console.error("Ошибка при блокировке пользователя:", error);
      notification.error({ message: "Ошибка при блокировке пользователя" });
    }
  };

  const handleUnblockUser = async (id: number) => {
    try {
      await unblockUser(id);
      fetchUsers();
      notification.success({
        message: `Пользователсь c id:${id} разблокирован`,
      });
    } catch (error) {
      console.error("Ошибка при разблокировании пользователя:", error);
      notification.error({
        message: "Ошибка при разблокировании пользователя",
      });
    }
  };

  //обновление прав пользователя/////////////////////////////////////////////////
  const handleUpdateUserRights = async (id: number, value: boolean) => {
    try {
      await updateUserRights(id, value);
      fetchUsers();
      notification.success({
        message: `Изменены права у полоьзователя c id:${id}`,
      });
    } catch (error) {
      console.error("Ошибка при изменнении роли пользователя:", error);
      notification.error({
        message: "Ошибка при изменнении роли пользователя",
      });
    }
  };

  //фильтрация///////////////////////////////////////////////////////////////////
  const hendleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSortByTypeMenuClick: MenuProps["onClick"] = (info) => {
    setSortByType(info.key as UserKeys);
  };

  const handleSortOrderTypeMenuClick: MenuProps["onClick"] = (info) => {
    setSortOrderType(info.key as "ASC" | "DESC");
  };

  const handleSortByBlock: MenuProps["onClick"] = (info) => {
    let value: boolean | undefined;

    // Преобразование строки в boolean или undefined
    if (info.key === "true") {
      value = true;
    } else if (info.key === "false") {
      value = false;
    } else {
      value = undefined;
    }

    setIsBlockedType(value);
  };

  const sortByTypeItems: MenuProps["items"] = [
    {
      key: "id",
      label: <p>id</p>,
    },
    {
      key: "username",
      label: <p>Имени</p>,
    },
    {
      key: "email",
      label: <p>Email</p>,
    },
    {
      key: "date",
      label: <p>Дате регистрации</p>,
    },
  ];

  const sortOrderTypeItems: MenuProps["items"] = [
    {
      key: "ASC",
      label: <p>Возрастания</p>,
    },
    {
      key: "DESC",
      label: <p>Убывания</p>,
    },
  ];

  const sortByBlock: MenuProps["items"] = [
    {
      key: "undefined",
      label: <p>Все пользователи</p>,
    },
    {
      key: "true",
      label: <p>Заблокированные</p>,
    },
    {
      key: "false",
      label: <p>Активные</p>,
    },
  ];

  // Определяем столбцы для таблицы
  const columns = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      render: (text: string) => <Space>{text}</Space>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <Space>
          <MailOutlined />
          <a
            style={{ wordBreak: "break-word", maxWidth: "150px" }}
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </Space>
      ),
    },
    {
      title: "Телефон",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (phone: string) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      render: (date: string) =>
        new Date(date).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Роль",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (_: any, record: User) => {
        return (
          <>
            {record.isAdmin ? (
              <>
                <Space>
                  <Tag color={"orange"}>Админ</Tag>
                  <Button
                    icon={<ArrowDownOutlined />}
                    danger
                    type="default"
                    size="small"
                    onClick={() => {
                      handleUpdateUserRights(record.id, false);
                    }}
                  />
                </Space>
              </>
            ) : (
              <>
                <Space>
                  <Tag color={"blue"}>Пользователь</Tag>
                  <Button
                    icon={<ArrowUpOutlined />}
                    color="primary"
                    type="default"
                    size="small"
                    onClick={() => {
                      handleUpdateUserRights(record.id, true);
                    }}
                  />
                </Space>
              </>
            )}
          </>
        );
      },
    },
    {
      title: "Блокировка",
      key: "statusActions",
      render: (_: any, record: User) => (
        <Space>
          {record.isBlocked ? (
            <Tag color="red">Заблок</Tag>
          ) : (
            <Tag color="green">Актив</Tag>
          )}
          {record.isBlocked ? (
            <Button
              icon={<UnlockOutlined />}
              type="default"
              size="small"
              onClick={() => handleUnblockUser(record.id)}
            >
              Разблок
            </Button>
          ) : (
            <Button
              icon={<LockOutlined />}
              type="default"
              size="small"
              onClick={() => handleBlockUser(record.id)}
            >
              Заблок
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "",
      key: "delete",
      render: (_: any, record: User) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => showDeleteUserModal(record.id)}
          />
        </Space>
      ),
    },
    {
      title: "",
      key: "chengeData",
      render: (_: any, record: User) => (
        <Space>
          <Button
            icon={<RightOutlined />}
            size="small"
            onClick={() => showChangeUserDataModal(record)}
          />
        </Space>
      ),
    },
  ];

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
            <Input
              maxLength={65}
              placeholder="Поиск по имени или email"
              value={searchInput}
              onChange={hendleChangeSearchInput}
              style={{
                marginBottom: "20px",
                marginRight: "20px",
                width: "35%",
              }}
            />
            <Dropdown
              menu={{
                items: sortByTypeItems,
                selectedKeys: [sortByType],
                onClick: handleSortByTypeMenuClick,
              }}
            >
              <Space style={{ marginRight: "20px" }}>
                Сортировать по <DownOutlined />
              </Space>
            </Dropdown>
            <Dropdown
              menu={{
                items: sortOrderTypeItems,
                selectedKeys: [sortOrderType],
                onClick: handleSortOrderTypeMenuClick,
              }}
            >
              <Space style={{ marginRight: "20px" }}>
                В порядке <DownOutlined />
              </Space>
            </Dropdown>

            <Dropdown
              menu={{
                items: sortByBlock,
                selectedKeys: [String(isBlockedType)],
                onClick: handleSortByBlock,
              }}
            >
              <Space style={{ marginRight: "20px" }}>
                Статус блокировки <DownOutlined />
              </Space>
            </Dropdown>

            <Pagination
              current={offsetNum + 1}
              pageSize={limitOnPage}
              total={totalAmount}
              align="center"
              onChange={(page) => {
                setOffsetNum(page - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              showSizeChanger={false}
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            />
            <Table
              dataSource={usersList}
              columns={columns}
              rowKey={(record) => record.id} // Указываем ключ для строк
              pagination={false} // Без пагинации
              bordered // Границы для таблицы
            />
            <Pagination
              current={offsetNum + 1}
              pageSize={limitOnPage}
              total={totalAmount}
              align="center"
              onChange={(page) => {
                setOffsetNum(page - 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              showSizeChanger={false}
              style={{ marginTop: "20px", textAlign: "center" }}
            />

            <Modal
              title="Подтверждение удаления пользователя"
              open={isDeleteUserModalVisible}
              onOk={() => handleDeleteUser()}
              onCancel={handleDeleteUserCancel}
              okText="Да, удалить"
              cancelText="Отмена"
            >
              <p>Вы действительно хотите удалить пользователя?</p>
            </Modal>

            <Modal
              title="Редактирование данных пользователей"
              open={isChangeUserDataModalVisible}
              onOk={() => handleChangeUserData()}
              onCancel={handleChangeUserDataCancel}
              okText="Редактировать"
              cancelText="Отмена"
            >
              <Form name="basic" layout="vertical">
                <Form.Item label="Имя">
                  <Input
                    value={userNameInput}
                    onChange={hendleChangeuserNameInput}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    value={userMailInput}
                    onChange={hendleChangeuserMailInput}
                  />
                </Form.Item>
                <Form.Item label="Номер телефона">
                  <Input
                    value={userPhoneInput}
                    onChange={hendleChangeuserPhoneInput}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Users;
