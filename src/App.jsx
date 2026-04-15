import { Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import MainLayout from "./layouts/MainLayout";
import StudentLayout from "./layouts/StudentLayout";
import StudentPortfolioLayout from "./layouts/StudentPortfolioLayout";
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherPortfolioLayout from "./layouts/TeacherPortfolioLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import HomePage from "./pages/common/HomePage";
import LectureDetailPage from "./pages/common/LectureDetailPage";
import MyLecturePage from "./pages/common/MyLecturePage";
import CartPage from "./pages/student/CartPage";
import ProjectPage from "./pages/student/ProjectPage";
import ProjectRegistPage from "./pages/student/ProjectRegistPage";
import ProjectEditPage from "./pages/student/ProjectEditPage";
import ProjectTotalPage from "./pages/common/ProjectTotalPage";
import ProjectDetailPage from "./pages/common/ProjectDetailPage";
import InterviewDetailPage from "./pages/common/InterviewDetailPage";
import InterviewNoticePage from "./pages/student/InterviewNoticePage";
import InterviewPracticePage from "./pages/student/InterviewPracticePage";
import LectureRegistPage from "./pages/teacher/LectureRegistPage";
import LectureEditPage from "./pages/teacher/LectureEditPage";
import TemplateRegistPage from "./pages/teacher/TemplateRegistPage";
import TemplateEditPage from "./pages/teacher/TemplateEditPage";
import InterviewTotalPage from "./pages/teacher/InterviewTotalPage";
import InterviewRegistPage from "./pages/teacher/InterviewRegistPage";
import ManagerDashboardPage from "./pages/manager/ManagerDashboardPage";
import UserManagePage from "./pages/manager/UserManagePage";
import LectureManagePage from "./pages/manager/LectureManagePage";
import DataManagePage from "./pages/manager/DataManagePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import PortfolioPage from "./pages/common/PortfolioPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":lectureid" element={<LectureDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="/:role" element={<StudentLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":lectureid" element={<LectureDetailPage />} />
          <Route path="cart" element={<CartPage />} />

          <Route path="mylec">
            <Route index element={<MyLecturePage />} />
            <Route path=":lectureid" element={<LectureDetailPage />}>
              <Route path="myproj">
                <Route index element={<ProjectPage />} />
                <Route path="regist" element={<ProjectRegistPage />} />
                <Route path="edit" element={<ProjectEditPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="portfolio" element={<StudentPortfolioLayout />}>
            <Route index element={<Navigate to="project" replace />} />

            <Route path="project">
              <Route index element={<PortfolioPage />} />
              <Route path=":lectureid" element={<ProjectTotalPage />}>
                <Route path=":projectid" element={<ProjectDetailPage />} />
              </Route>
            </Route>

            <Route path="interview">
              <Route index element={<PortfolioPage />} />
              <Route path=":lectureid" element={<InterviewDetailPage />} />
              <Route path=":lectureid/notice" element={<InterviewNoticePage />} />
              <Route path=":lectureid/practice" element={<InterviewPracticePage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/:role" element={<TeacherLayout />}>
          <Route index element={<HomePage />} />
          <Route path=":lectureid" element={<LectureDetailPage />} />

          <Route path="mylec">
            <Route index element={<MyLecturePage />} />
            <Route path="regist" element={<LectureRegistPage />} />
            <Route path=":lectureid" element={<LectureDetailPage />} />
            <Route path=":lectureid/edit" element={<LectureEditPage />} />
          </Route>

          <Route path="portfolio" element={<TeacherPortfolioLayout />}>
            <Route index element={<Navigate to="project" replace />} />

            <Route path="project">
              <Route index element={<PortfolioPage />} />
              <Route
                path=":lectureid/regist"
                element={<TemplateRegistPage />}
              />
              <Route path=":lectureid/edit" element={<TemplateEditPage />} />
              <Route path=":lectureid" element={<ProjectTotalPage />}>
                <Route path=":projectid" element={<ProjectDetailPage />} />
              </Route>
            </Route>

            <Route path=":role">
              <Route index element={<PortfolioPage />} />
              <Route path=":lectureid" element={<InterviewTotalPage />}>
                <Route
                  path=":projectid/regist"
                  element={<InterviewRegistPage />}
                />
                <Route
                  path=":projectid/detail"
                  element={<InterviewDetailPage />}
                />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboardPage />} />
          <Route path="user" element={<UserManagePage />} />
          <Route path="lecture" element={<LectureManagePage />}>
            <Route path=":lectureid" element={<LectureDetailPage />} />
          </Route>
          <Route path="data" element={<DataManagePage />}>
            <Route path=":projectid/project" element={<ProjectDetailPage />} />
            <Route
              path=":projectid/interview"
              element={<InterviewDetailPage />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
