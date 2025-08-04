import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import {
  SignIn,
  SignUp,
  AdminLayout,
  Teachers,
  Students,
  Course,
  ProtectChildrem,
  LoginChildren,
  Branch,
  Groups,
  Room,
  SingleGroup,
  TeachersLayout,
  TeacherGroups,
  TeacherSingleGroupPage,
  ForgotPassword,
} from "@pages";
import Notfoun from "../pages/not-found/not-found";
const App = lazy(() => import("../App"));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <LoginChildren>
              <SignIn />
            </LoginChildren>
          }
        />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="admin/"
          element={
            <ProtectChildrem>
              <AdminLayout />
            </ProtectChildrem>
          }
        >
          <Route path="group" element={<Groups />} />
          <Route path="group/:id" element={<SingleGroup />}></Route>
          <Route path="courses" element={<Course />} />
          <Route path="branches" element={<Branch />} />
          <Route path="student" element={<Students />}></Route>
          <Route path="teacher" element={<Teachers />}></Route>
          <Route path="room" element={<Room />}></Route>
        </Route>

        <Route
          path="teacher"
          element={
            <ProtectChildrem>
              <TeachersLayout />
            </ProtectChildrem>
          }
        >
          {/* <Route path="me" element={<TeacherProfile />} /> */}
          <Route path="my-groups" element={<TeacherGroups />} />
          <Route path="my-groups/:id" element={<TeacherSingleGroupPage />} />
        </Route>

        <Route path="*" element={<Notfoun />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
