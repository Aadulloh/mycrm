import type { GroupLessonsType, Lesson } from "@types";
import { Button, Tooltip, Card, Badge, Space, Typography } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  CalendarOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { LessonModal } from "./modal";

const { Text } = Typography;

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

const LessonList = ({ lessons }: GroupLessonsType) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const goNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const isStartDisabled = () => {
    if (!containerRef.current) return true;
    return scrollPosition <= 5;
  };

  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const container = containerRef.current;
    return scrollPosition + container.clientWidth >= container.scrollWidth - 3;
  };

  // Get lesson status based on date
  const getLessonStatus = (lessonDate: string) => {
    const today = dayjs();
    const lesson = dayjs(lessonDate);

    if (lesson.isBefore(today, "day")) return "completed";
    if (lesson.isSame(today, "day")) return "today";
    return "upcoming";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return blueTheme.primary;
      case "today":
        return "#52c41a";
      case "upcoming":
        return "#d9d9d9";
      default:
        return blueTheme.light;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "today":
        return "Today";
      case "upcoming":
        return "Upcoming";
      default:
        return "";
    }
  };

  return (
    <Card
      style={{
        background: "#ffffff",
        border: `1px solid ${blueTheme.border}`,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(24, 144, 255, 0.1)",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <BookOutlined
            style={{ color: blueTheme.primary, fontSize: "18px" }}
          />
          <Text strong style={{ fontSize: "16px", color: blueTheme.darker }}>
            Lesson Schedule
          </Text>
          <Badge
            count={lessons.length}
            style={{ backgroundColor: blueTheme.primary }}
          />
        </Space>
      </div>

      {/* Navigation Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: blueTheme.background,
          padding: "12px",
          borderRadius: "8px",
        }}
      >
        {/* Previous Button */}
        <Button
          type="primary"
          icon={<LeftOutlined />}
          onClick={goPrev}
          disabled={isStartDisabled()}
          style={{
            background: isStartDisabled() ? "#f5f5f5" : blueTheme.primary,
            borderColor: isStartDisabled() ? "#d9d9d9" : blueTheme.primary,
            minWidth: "44px",
            height: "44px",
            borderRadius: "8px",
          }}
        />

        {/* Lessons Container */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            flex: 1,
            padding: "4px 0",
          }}
          className="[&::-webkit-scrollbar]:hidden"
        >
          {lessons.map((lesson: Lesson, index: number) => {
            const formattedDate = dayjs(lesson.date).format("MMM DD");
            const dayName = dayjs(lesson.date).format("ddd");
            const status = getLessonStatus(lesson.date);
            const statusColor = getStatusColor(status);

            return (
              <Tooltip
                key={lesson.id}
                title={
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: "bold" }}>Lesson {index + 1}</div>
                    <div>{dayjs(lesson.date).format("MMMM DD, YYYY")}</div>
                    <div style={{ fontSize: "12px", opacity: 0.8 }}>
                      {getStatusText(status)}
                    </div>
                  </div>
                }
                placement="top"
              >
                <div
                  onClick={() => setSelectedLesson(lesson)}
                  style={{
                    minWidth: "80px",
                    height: "80px",
                    background: "#ffffff",
                    border: `2px solid ${statusColor}`,
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  className="hover:shadow-lg hover:scale-105"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(24, 144, 255, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 2px 4px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  {/* Status Indicator */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: statusColor,
                      border: "2px solid #ffffff",
                    }}
                  />

                  {/* Calendar Icon */}
                  <CalendarOutlined
                    style={{
                      fontSize: "16px",
                      color: statusColor,
                      marginBottom: "4px",
                    }}
                  />

                  {/* Date */}
                  <Text
                    strong
                    style={{
                      fontSize: "12px",
                      color: blueTheme.darker,
                      textAlign: "center",
                      lineHeight: 1.2,
                    }}
                  >
                    {formattedDate}
                  </Text>

                  {/* Day */}
                  <Text
                    style={{
                      fontSize: "10px",
                      color: blueTheme.dark,
                      textAlign: "center",
                    }}
                  >
                    {dayName}
                  </Text>

                  {/* Lesson Number */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      right: "4px",
                      background: statusColor,
                      color:
                        status === "upcoming" ? blueTheme.darker : "#ffffff",
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
              </Tooltip>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={goNext}
          disabled={isEndDisabled()}
          style={{
            background: isEndDisabled() ? "#f5f5f5" : blueTheme.primary,
            borderColor: isEndDisabled() ? "#d9d9d9" : blueTheme.primary,
            minWidth: "44px",
            height: "44px",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          background: blueTheme.background,
          borderRadius: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space size="large">
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: blueTheme.primary,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {
                lessons.filter((l) => getLessonStatus(l.date) === "completed")
                  .length
              }
            </div>
            <Text style={{ fontSize: "12px", color: blueTheme.dark }}>
              Completed
            </Text>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#52c41a",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {
                lessons.filter((l) => getLessonStatus(l.date) === "today")
                  .length
              }
            </div>
            <Text style={{ fontSize: "12px", color: blueTheme.dark }}>
              Today
            </Text>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: blueTheme.dark,
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              {
                lessons.filter((l) => getLessonStatus(l.date) === "upcoming")
                  .length
              }
            </div>
            <Text style={{ fontSize: "12px", color: blueTheme.dark }}>
              Upcoming
            </Text>
          </div>
        </Space>

        <Text style={{ fontSize: "12px", color: blueTheme.dark }}>
          Total: {lessons.length} lessons
        </Text>
      </div>

      {/* Modal */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          open={!!selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </Card>
  );
};

export default LessonList;
