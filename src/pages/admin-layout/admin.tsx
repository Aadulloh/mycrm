import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  BookOutlined,
  ForkOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Layout, Menu, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { clearStorage } from "../../helpers";
const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items: MenuProps["items"] = [
  {
    key: "/admin",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/group">Groups</Link>,
  },
  {
    key: "/admin/students",
    icon: React.createElement(TeamOutlined),
    label: <Link to="/admin/student">Students</Link>,
  },
  {
    key: "/admin/courses",
    icon: React.createElement(BookOutlined),
    label: <Link to="/admin/courses">Courses</Link>,
  },
  {
    key: "/admin/branches",
    icon: React.createElement(ForkOutlined),
    label: <Link to="/admin/branches">Branches</Link>,
  },
  {
    key: "/admin/teachers",
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/teacher">Teachers</Link>,
  },
  {
    key: "/admin/rooms",
    icon: React.createElement(HomeOutlined),
    label: <Link to="/admin/room">Rooms</Link>,
  },
];

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const logout = () => {
    clearStorage();
    navigate("/");
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div
          style={{
            height: 64,
            margin: 16,
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Button
            type="primary"
            style={{ margin: "16px" }}
            onClick={() => logout()}
          >
            Log out
            <LogoutOutlined />
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 134px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Admin;
