import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../utils/withSuspense";

import Login5 from "../src/component/login/login5";
import AdmissionForm from "../src/component/forms/admission-form";
import { Form1 } from "../src/component/forms/admission/form-1";
import { Form2 } from "../src/component/forms/admission/form-2";
import { Form3 } from "../src/component/forms/admission/form-3";
import { Form4 } from "../src/component/forms/admission/form-4";
import { Form5 } from "../src/component/forms/admission/form-5";

import Dashboard from "../src/component/Dashbaord/dashboard";
import Signup from "../src/component/signup/signup";
import AdminTemplate from "../src/Templates/admin-template";
import ProtectedRoute from "../utils/protectRoute";
import ApplicationSubmitted from "../src/component/applicationSubmitted";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/form/student-info",
    element: (
      <ProtectedRoute>
        {/* <AdminTemplate> */}
          <Form1 />
        {/* </AdminTemplate> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/guardian-info",
    element: (
      <ProtectedRoute>
        {/* <AdminTemplate> */}
          <Form2 />
        {/* </AdminTemplate> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/address",
    element: (
      <ProtectedRoute>
        {/* <AdminTemplate> */}
          <Form3 />
        {/* </AdminTemplate> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/school-info",
    element: (
      <ProtectedRoute>
        {/* <AdminTemplate> */}
          <Form4 />
        {/* </AdminTemplate> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/test-preference",
    element: (
      <ProtectedRoute>
        {/* <AdminTemplate> */}
          <Form5 />
        {/* </AdminTemplate> */}
      </ProtectedRoute>
    ),
  },

  {
    path: "/form/complete",
    element: withSuspense(
      <ProtectedRoute>
        <ApplicationSubmitted />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: withSuspense(<Login5 />),
  },
  {
    path: "/admission-form",
    element: withSuspense(<AdmissionForm />),
  },
  {
    path: "/dashboard",
    element: withSuspense(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: withSuspense(<Signup />),
  },
]);
