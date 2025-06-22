import { Route, Routes } from "react-router-dom";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import AdminCompanies from "./components/AdminCompanies";
import AdminJobs from "./components/AdminJobs";
import CompanyRegister from "./components/CompanyRegister";
import UpdateCompany from "./components/UpdateCompany";
import CreateJobs from "./components/CreateJobs";
import UpdateJob from "./components/UpdateJob";
import Applicants from "./components/Applicants";
import ProtectedRoute from "./components/authComponents/ProtectedRoute";
import UserProtectedRoute from "./components/authComponents/UserProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        {/* User routes */}

        <Route
          path="/"
          element={
              <Home />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/jobs"
          element={
              <Jobs />
          }
        />
        <Route path="/browse" element={<Browse />} />
        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/jobs/description/:id"
          element={
            <UserProtectedRoute>
              <JobDescription />
            </UserProtectedRoute>
          }
        />

        {/* Admin routes */}

        <Route
          path="/admin/companies"
          element={
            <ProtectedRoute>
              <AdminCompanies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companyregister"
          element={
            <ProtectedRoute>
              <CompanyRegister />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            <ProtectedRoute>
              <UpdateCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobs/:id"
          element={
            <ProtectedRoute>
              <UpdateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/createJob"
          element={
            <ProtectedRoute>
              <CreateJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/jobsid/applicants"
          element={
            <ProtectedRoute>
              <Applicants />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
