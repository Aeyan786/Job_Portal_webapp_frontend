import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "applicant") {
    return <Navigate to="/admin/companies" replace />;
  }

  return children;
};

export default UserProtectedRoute;
