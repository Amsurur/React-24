import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children, allowedRoles = ["User"] }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) return <Navigate to="/login" replace />;

  let role;
  try {
    const decoded = jwtDecode(token);
    role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/login" replace />;
  }

  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  if (!rolesArray.includes(role)) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
