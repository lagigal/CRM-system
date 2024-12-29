import React, { ChangeEvent, useEffect, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  Table,
  Tag,
  Button,
  Space,
  Layout,
  notification,
  Input,
  Modal,
  Pagination,
} from "antd";
import {
  MailOutlined,
  UnlockOutlined,
  LockOutlined,
  RightOutlined,
  DeleteOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import {
  blockUser,
  deleteUser,
  getUsers,
  unblockUser,
  updateUserRights,
} from "../api/baseAPI";
import { User, UserKeys } from "../constants/interfaces";
import CustomMenu from "../components/CustomMenu";
import { Content } from "antd/es/layout/layout";
import type { TablePaginationConfig } from "antd/es/table/interface";
import type { SorterResult, FilterValue } from "antd/es/table/interface";
import { useNavigate } from "react-router-dom";

const Users: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);

  // --- Состояния для модалок ---
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] = useState(false);
  const [isBlockUserModalVisible, setIsBlockUserModalVisible] = useState(false);
  const [isUpdateUserRightsModalVisible, setIsUpdateUserRightsModalVisible] =
    useState(false);

  // --- Параметры для действия в модалках ---
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [blockModalActionText, setBlockModalActionText] = useState("");
  const [blockState, setBlockState] = useState<boolean | null>(null);
  const [newRights, setNewRights] = useState<boolean | null>(null);
  const [updateUserRightsActionText, setUpdateUserRightsActionText] = useState(
    ""
  );

  // --- Параметры сортировки, фильтрации, пагинации ---
  const [searchInput, setSearchInput] = useState("");
  const [sortByType, setSortByType] = useState<UserKeys>("id");
  const [sortOrderType, setSortOrderType] = useState<"ASC" | "DESC">("ASC");
  const [offsetNum, setOffsetNum] = useState(0);
  const [isBlockedType, setIsBlockedType] = useState<boolean | undefined>(
    undefined
  );
  const [limitOnPage] = useState<number>(20);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // --- Навигация для редактирования пользователя ---
  const navigate = useNavigate();
  const handleEditUser = (id: number) => {
    navigate(`/users/${id}/edit`);
  };

  // --- Получение списка пользователей ---
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

  // --- Обработчик таблицы (сортировка, фильтры, пагинация) ---
  const handleTableChange: TableProps<User>["onChange"] = (
    _pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => {
    // 1) Сортировка
    if (!Array.isArray(sorter)) {
      if (sorter.field && sorter.order) {
        setSortByType(sorter.field as UserKeys);
        setSortOrderType(sorter.order === "ascend" ? "ASC" : "DESC");
      } else {
        setSortByType("id");
        setSortOrderType("ASC");
      }
    }

    // 2) Фильтр «isBlocked»
    const blockFilterValue = filters.isBlocked as string[] | undefined;
    if (blockFilterValue && blockFilterValue.length > 0) {
      if (blockFilterValue[0] === "true") {
        setIsBlockedType(true);
      } else if (blockFilterValue[0] === "false") {
        setIsBlockedType(false);
      } else {
        setIsBlockedType(undefined);
      }
    } else {
      setIsBlockedType(undefined);
    }
  };

  // --- Модалка блокировки/разблокировки ---
  const showBlockUserModal = (userId: number, newBlockState: boolean) => {
    setSelectedUserId(userId);
    setBlockState(newBlockState);
    setBlockModalActionText(newBlockState ? "заблокировать" : "разблокировать");
    setIsBlockUserModalVisible(true);
  };

  const handleConfirmBlockUser = async () => {
    if (selectedUserId === null || blockState === null) return;

    try {
      if (blockState) {
        await blockUser(selectedUserId);
        notification.success({
          message: `Пользователь c id:${selectedUserId} заблокирован`,
        });
      } else {
        await unblockUser(selectedUserId);
        notification.success({
          message: `Пользователь c id:${selectedUserId} разблокирован`,
        });
      }
      fetchUsers();
    } catch (error) {
      console.error("Ошибка при (раз)блокировке пользователя:", error);
      notification.error({
        message: "Ошибка при (раз)блокировке пользователя",
      });
    } finally {
      setIsBlockUserModalVisible(false);
      setSelectedUserId(null);
      setBlockState(null);
    }
  };

  const handleBlockUserModalCancel = () => {
    setIsBlockUserModalVisible(false);
    setSelectedUserId(null);
    setBlockState(null);
  };

  // --- Модалка удаления пользователя ---
  const showDeleteUserModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsDeleteUserModalVisible(true);
  };

  const handleDeleteUser = async () => {
    if (selectedUserId === null) return;
    try {
      await deleteUser(selectedUserId);
      fetchUsers();
      notification.success({
        message: `Пользователь c id:${selectedUserId} удален`,
      });
      setIsDeleteUserModalVisible(false);
      setSelectedUserId(null);
    } catch (error) {
      console.error("Ошибка при удалении пользователя:", error);
      notification.error({ message: "Ошибка при удалении пользователя" });
    }
  };

  const handleDeleteUserCancel = () => {
    setIsDeleteUserModalVisible(false);
    setSelectedUserId(null);
  };

  // --- Модалка изменения прав (админ/пользователь) ---
  const showUpdateUserRightsModal = (userId: number, newRights: boolean) => {
    setSelectedUserId(userId);
    setNewRights(newRights);

    setUpdateUserRightsActionText(
      newRights
        ? "повысить пользователя до администратора"
        : "понизить администратора до пользователя"
    );

    setIsUpdateUserRightsModalVisible(true);
  };

  const handleConfirmUpdateUserRights = async () => {
    if (selectedUserId !== null && newRights !== null) {
      await handleUpdateUserRights(selectedUserId, newRights);
      setIsUpdateUserRightsModalVisible(false);
      setSelectedUserId(null);
      setNewRights(null);
    }
  };

  const handleUpdateUserRights = async (id: number, value: boolean) => {
    try {
      await updateUserRights(id, value);
      fetchUsers();
      notification.success({
        message: `Изменены права пользователя c id:${id}`,
      });
    } catch (error) {
      console.error("Ошибка при изменении роли пользователя:", error);
      notification.error({
        message: "Ошибка при изменении роли пользователя",
      });
    }
  };

  const handleUpdateUserRightsCancel = () => {
    setIsUpdateUserRightsModalVisible(false);
    setSelectedUserId(null);
    setNewRights(null);
  };

  // --- Фильтр по имени/email ---
  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const columns: ColumnsType<User> = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      sorter: true,
      sortOrder:
        sortByType === "username"
          ? sortOrderType === "ASC"
            ? "ascend"
            : "descend"
          : null,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      sortOrder:
        sortByType === "email"
          ? sortOrderType === "ASC"
            ? "ascend"
            : "descend"
          : null,
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
    },
    {
      title: "Дата регистрации",
      dataIndex: "date",
      key: "date",
      sorter: true,
      sortOrder:
        sortByType === "date"
          ? sortOrderType === "ASC"
            ? "ascend"
            : "descend"
          : null,
      render: (date: string) =>
        new Date(date).toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Статус/Блокировка",
      dataIndex: "isBlocked",
      key: "isBlocked",
      filters: [
        { text: "Все пользователи", value: "undefined" },
        { text: "Заблокированные", value: "true" },
        { text: "Активные", value: "false" },
      ],
      filteredValue: isBlockedType !== undefined ? [String(isBlockedType)] : [],
      onFilter: () => true,
      render: (_, record: User) => {
        const isBlockedTag = record.isBlocked ? (
          <Tag color="red">Заблок</Tag>
        ) : (
          <Tag color="green">Актив</Tag>
        );

        const blockButton = record.isBlocked ? (
          <Button
            icon={<UnlockOutlined />}
            type="default"
            size="small"
            onClick={() => showBlockUserModal(record.id, false)}
          >
            Разблок
          </Button>
        ) : (
          <Button
            icon={<LockOutlined />}
            type="default"
            size="small"
            onClick={() => showBlockUserModal(record.id, true)}
          >
            Заблок
          </Button>
        );

        return (
          <Space>
            {isBlockedTag}
            {blockButton}
          </Space>
        );
      },
    },
    {
      title: "Роль",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (_, record: User) => (
        <>
          {record.isAdmin ? (
            <Space>
              <Tag color="orange">Админ</Tag>
              <Button
                icon={<ArrowDownOutlined />}
                danger
                type="default"
                size="small"
                onClick={() => {
                  showUpdateUserRightsModal(record.id, false);
                }}
              />
            </Space>
          ) : (
            <Space>
              <Tag color="blue">Пользователь</Tag>
              <Button
                icon={<ArrowUpOutlined />}
                type="default"
                size="small"
                onClick={() => {
                  showUpdateUserRightsModal(record.id, true);
                }}
              />
            </Space>
          )}
        </>
      ),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record: User) => {
        const deleteBtn = (
          <Button
            icon={<DeleteOutlined />}
            size="small"
            danger
            onClick={() => showDeleteUserModal(record.id)}
          />
        );
        const editBtn = (
          <Button
            icon={<RightOutlined />}
            size="small"
            onClick={() => handleEditUser(record.id)}
          />
        );
        return (
          <Space>
            {deleteBtn}
            {editBtn}
          </Space>
        );
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}>
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
            onChange={handleChangeSearchInput}
            style={{
              marginBottom: "20px",
              marginRight: "20px",
              width: "35%",
            }}
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
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          />

          <Table<User>
            dataSource={usersList}
            columns={columns}
            rowKey={(record) => record.id}
            pagination={false}
            bordered
            onChange={handleTableChange}
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

          {/* Модалка удаления */}
          <Modal
            title="Подтверждение удаления пользователя"
            open={isDeleteUserModalVisible}
            onOk={handleDeleteUser}
            onCancel={handleDeleteUserCancel}
            okText="Да, удалить"
            cancelText="Отмена"
          >
            <p>Вы действительно хотите удалить пользователя?</p>
          </Modal>

          {/* Модалка блокировки/разблокировки */}
          <Modal
            title="Подтверждение блокировки пользователя"
            open={isBlockUserModalVisible}
            onOk={handleConfirmBlockUser}
            onCancel={handleBlockUserModalCancel}
            okText="Да"
            cancelText="Отмена"
          >
            <p>Вы действительно хотите {blockModalActionText} этого пользователя?</p>
          </Modal>

          {/* Модалка изменения прав пользователя */}
          <Modal
            title="Подтверждение изменения прав пользователя"
            open={isUpdateUserRightsModalVisible}
            onOk={handleConfirmUpdateUserRights}
            onCancel={handleUpdateUserRightsCancel}
            okText="Да, изменить роль"
            cancelText="Отмена"
          >
            <p>Вы действительно хотите {updateUserRightsActionText}?</p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Users;
