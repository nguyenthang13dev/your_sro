import Flex from "@/components/shared-components/Flex";
import
  {
    FONT_SIZES,
    FONT_WEIGHT,
    MEDIA_QUERIES,
    SPACER,
  } from "@/constants/ThemeConstant";
import { setLogout } from "@/store/auth/AuthSlice";
import { useSelector } from "@/store/hooks";
import { resetMenuData } from "@/store/menu/MenuSlice";
import { AppDispatch } from "@/store/store";
import
  {
    LogoutOutlined
  } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import NavItem from "./NavItem";

// Styled components
const Icon = styled.div(() => ({
  fontSize: FONT_SIZES.LG,
}));

const Profile = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));

const UserInfo = styled("div")`
  padding-left: ${SPACER[2]};

  @media ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;

const Name = styled.div(() => ({
  fontWeight: FONT_WEIGHT.SEMIBOLD,
}));

const Title = styled.span(() => ({
  opacity: 0.8,
}));

interface MenuItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MenuItemSignOutProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon }) => (
  <Flex as="a" alignItems="center" gap={SPACER[2]}>
    <Icon>{icon}</Icon>
    <span>{label}</span>
  </Flex>
);

const MenuItemSignOut: React.FC<MenuItemSignOutProps> = ({ label }) => {
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const handleSignOut = () => {
    dispatch(setLogout());
    dispatch(resetMenuData());
    route.push("/auth/login");
  };

  return (
    <div onClick={handleSignOut}>
      <Flex alignItems="center" gap={SPACER[2]}>
        <Icon>
          <LogoutOutlined />
        </Icon>
        <span>{label}</span>
      </Flex>
    </div>
  );
};

export const NavProfile: React.FC = () => {
  const user = useSelector((state) => state.auth.User);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const items: MenuProps["items"] = [
    // {
    //   key: "Chỉnh sửa thông tin",
    //   label: (
    //     <div onClick={handleOpenModal}>
    //       <MenuItem
    //         path="/"
    //         label="Chỉnh sửa thông tin"
    //         icon={<EditOutlined />}
    //         // Mở modal khi nhấn
    //       />
    //     </div>
    //   ),
    // },
    {
      key: "Đăng xuất",
      label: <MenuItemSignOut label="Đăng xuất" />,
    },
  ];

  return (
    <>
      <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
        <NavItem>
          <Profile>
            <Avatar src={user?.anhDaiDien || "/img/avatars/default_avatar.png"} />
            <UserInfo className="profile-text">
              <Name>{user?.userName}</Name>
            </UserInfo>
          </Profile>
        </NavItem>
      </Dropdown>
      {/* <ChangePass visible={isModalVisible} onClose={handleCloseModal} /> */}
    </>
  );
};

export default NavProfile;
