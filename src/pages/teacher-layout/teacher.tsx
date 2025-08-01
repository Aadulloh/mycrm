import { Outlet } from "react-router-dom";

function TeacherLayout() {
  return (
    <div>
      Teacher
      <Outlet />
    </div>
  );
}

export default TeacherLayout;
