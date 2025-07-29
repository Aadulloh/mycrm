import { Collapse, Avatar, Card, Space, Typography, Tag, Divider } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  TeamOutlined,
  CrownOutlined,
  BookOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import React from "react";

const { Panel } = Collapse;
const { Text, Title } = Typography;

// Blue theme colors
const blueTheme = {
  primary: "#1890ff",
  light: "#69c0ff",
  dark: "#096dd9",
  darker: "#0050b3",
  background: "#f0f8ff",
  border: "#d6e7ff",
  hover: "#40a9ff",
};

function GroupTeachers({ teachers }: any) {
  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      admin: "#ff4d4f",
      head_teacher: "#fa8c16",
      senior_teacher: blueTheme.primary,
      teacher: "#52c41a",
      assistant: "#722ed1",
    };
    return roleColors[role.toLowerCase()] || blueTheme.primary;
  };

  const getRoleIcon = (role: string) => {
    const roleIcons: Record<string, React.ReactNode> = {
      admin: <CrownOutlined />,
      head_teacher: <TeamOutlined />,
      senior_teacher: <BookOutlined />,
      teacher: <UserOutlined />,
      assistant: <UserOutlined />,
    };
    return roleIcons[role.toLowerCase()] || <UserOutlined />;
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div style={{ padding: "24px", background: "#fafafa", minHeight: "100vh" }}>
      <Card
        title={
          <Space>
            <TeamOutlined
              style={{ color: blueTheme.primary, fontSize: "20px" }}
            />
            <Title level={3} style={{ margin: 0, color: blueTheme.darker }}>
              Teaching Staff Directory
            </Title>
          </Space>
        }
        style={{
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(24, 144, 255, 0.15)",
          border: `1px solid ${blueTheme.border}`,
        }}
        headStyle={{
          background: `linear-gradient(135deg, ${blueTheme.background} 0%, #ffffff 100%)`,
          borderBottom: `2px solid ${blueTheme.border}`,
        }}
      >
        <Collapse
          accordion
          expandIconPosition="end"
          style={{ background: "transparent" }}
          ghost
        >
          {teachers.map((item: any) => {
            const { teacher, start_date, end_date } = item;
            const fullName = `${teacher.first_name} ${teacher.last_name}`;
            const avatar = teacher.avatar_url || "";
            const roleColor = getRoleColor(teacher.role);
            const roleIcon = getRoleIcon(teacher.role);
            const initials = getInitials(teacher.first_name, teacher.last_name);

            return (
              <Panel
                header={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "8px 0",
                    }}
                  >
                    <div style={{ position: "relative" }}>
                      <Avatar
                        size={48}
                        src={avatar || undefined}
                        style={{
                          backgroundColor: avatar
                            ? undefined
                            : blueTheme.primary,
                          fontWeight: "600",
                          fontSize: "16px",
                          border: `2px solid ${blueTheme.light}`,
                        }}
                      >
                        {!avatar && initials}
                      </Avatar>
                      {/* Role Badge */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          right: "-2px",
                          background: roleColor,
                          borderRadius: "50%",
                          width: "18px",
                          height: "18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #ffffff",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                        }}
                      >
                        <span style={{ color: "#ffffff", fontSize: "8px" }}>
                          {roleIcon}
                        </span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "2px",
                        }}
                      >
                        <Text
                          strong
                          style={{
                            fontSize: "18px",
                            color: blueTheme.darker,
                          }}
                        >
                          {fullName}
                        </Text>
                        <Tag
                          color={roleColor}
                          style={{
                            fontSize: "10px",
                            fontWeight: "500",
                            textTransform: "capitalize",
                            border: "none",
                            borderRadius: "12px",
                            margin: 0,
                          }}
                        >
                          {teacher.role.replace("_", " ")}
                        </Tag>
                      </div>
                      <Text
                        style={{
                          fontSize: "13px",
                          color: blueTheme.dark,
                          fontWeight: "500",
                        }}
                      >
                        ID: {teacher.id} • Active since {formatDate(start_date)}
                      </Text>
                    </div>
                  </div>
                }
                key={teacher.id}
                style={{
                  marginBottom: "12px",
                  border: `1px solid ${blueTheme.border}`,
                  borderRadius: "8px",
                  background: "#ffffff",
                  boxShadow: "0 1px 4px rgba(24, 144, 255, 0.08)",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    background: blueTheme.background,
                    borderRadius: "6px",
                    margin: "-8px",
                  }}
                >
                  <Space
                    direction="vertical"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    {/* Full Name */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: blueTheme.primary,
                        }}
                      >
                        <UserOutlined
                          style={{ color: "#fff", fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Full Name
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueTheme.darker,
                          }}
                        >
                          {fullName}
                        </Text>
                      </div>
                    </div>

                    <Divider
                      style={{ margin: "8px 0", borderColor: blueTheme.border }}
                    />

                    {/* Role & Hierarchy */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: roleColor,
                        }}
                      >
                        {roleIcon &&
                          React.cloneElement(roleIcon as React.ReactElement)}
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Role & Position
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueTheme.darker,
                          }}
                        >
                          {teacher.role
                            .replace("_", " ")
                            .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                        </Text>
                      </div>
                    </div>

                    <Divider
                      style={{ margin: "8px 0", borderColor: blueTheme.border }}
                    />

                    {/* Duration */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: blueTheme.light,
                        }}
                      >
                        <CalendarOutlined
                          style={{ color: blueTheme.darker, fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Employment Period
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueTheme.darker,
                          }}
                        >
                          {formatDate(start_date)} - {formatDate(end_date)}
                        </Text>
                      </div>
                    </div>

                    <Divider
                      style={{ margin: "8px 0", borderColor: blueTheme.border }}
                    />

                    {/* Phone */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: "#52c41a",
                        }}
                      >
                        <PhoneOutlined
                          style={{ color: "#fff", fontSize: "16px" }}
                        />
                      </div>
                      <div>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Phone Number
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueTheme.darker,
                          }}
                        >
                          {teacher.phone || "Not provided"}
                        </Text>
                      </div>
                    </div>

                    <Divider
                      style={{ margin: "8px 0", borderColor: blueTheme.border }}
                    />

                    {/* Email */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "32px",
                          height: "32px",
                          borderRadius: "6px",
                          background: blueTheme.dark,
                        }}
                      >
                        <MailOutlined
                          style={{ color: "#fff", fontSize: "16px" }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text
                          type="secondary"
                          style={{
                            display: "block",
                            fontSize: "12px",
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Email Address
                        </Text>
                        <Text
                          strong
                          style={{
                            fontSize: "16px",
                            color: blueTheme.darker,
                            wordBreak: "break-all",
                          }}
                        >
                          {teacher.email || "Not provided"}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </div>
              </Panel>
            );
          })}
        </Collapse>

        {teachers.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: blueTheme.background,
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: blueTheme.primary,
                marginBottom: "16px",
              }}
            >
              <TeamOutlined style={{ fontSize: "32px", color: "#fff" }} />
            </div>
            <br />
            <Title
              level={4}
              style={{ color: blueTheme.dark, marginBottom: "8px" }}
            >
              No Teachers Found
            </Title>
            <Text type="secondary" style={{ fontSize: "14px" }}>
              There are currently no teachers assigned to this group.
            </Text>
          </div>
        )}
      </Card>
    </div>
  );
}

export default GroupTeachers;
