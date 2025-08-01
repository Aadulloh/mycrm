import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const SignUp = lazy(() => import("./auth/sign-up"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Teachers = lazy(() => import("./teachers/teacher"));
const Students = lazy(() => import("./students/student"));
const Groups = lazy(() => import("./groups/group"));
const Course = lazy(() => import("./courses/courses"));
const ProtectChildrem = lazy(() => import("./protect-route/layout-protect"));
const LoginChildren = lazy(() => import("./protect-route/login-protect"));
const Branch = lazy(() => import("./branch/branch"));
const Room = lazy(() => import("./rooms/room"));
const SingleGroup = lazy(() => import("./groups/single-group"));
const TeacherGroupStudents = lazy(
  () => import("./teacher-groups/group-students")
);
const TeacherGroups = lazy(() => import("./teacher-groups/teacher-groups"));
const TeacherLayout = lazy(() => import("./teacher-groups/teacher-groups"));

export {
  SignIn,
  SignUp,
  AdminLayout,
  Teachers,
  Students,
  Groups,
  Course,
  ProtectChildrem,
  LoginChildren,
  Branch,
  Room,
  SingleGroup,
  TeacherGroupStudents,
  TeacherGroups,
  TeacherLayout,
};
