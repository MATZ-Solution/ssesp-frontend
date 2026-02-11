import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../utils/withSuspense";

import Login1 from "../src/component/login/login1";
import Login2 from "../src/component/login/login2";
import Login3 from "../src/component/login/login3";
import Login4 from "../src/component/login/login4";
import Login5 from "../src/component/login/login5";

import AdmissionForm from "../src/component/forms/admission-form";
import { Form1 } from "../src/component/forms/admission/form-1";
import { Form2 } from "../src/component/forms/admission/form-2";
import { Form3 } from "../src/component/forms/admission/form-3";
import { Form4 } from "../src/component/forms/admission/form-4";
import { Form5 } from "../src/component/forms/admission/form-5";

import Dashboard from "../src/component/Dashbaord/dashboard";
import Signup from "../src/component/signup/signup";
import AdminTemplate from '../src/Templates/admin-template';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/form/student-info",
    element: (
      <AdminTemplate>
        <Form1 />
      </AdminTemplate>
    ),
  },
  {
    path: "/form/guardian-info",
    element: (
      <AdminTemplate>
        <Form2 />
      </AdminTemplate>
    ),
  },
  {
    path: "/form/address",
    element: (
      <AdminTemplate>
        <Form3 />
      </AdminTemplate>
    ),
  },
  {
    path: "/form/school-info",
    element: (
      <AdminTemplate>
        <Form4 />
      </AdminTemplate>
    ),
  },
  {
    path: "/form/test-preference",
    element: (
      <AdminTemplate>
        <Form5 />
      </AdminTemplate>
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
    element: withSuspense(<Dashboard />),
  },
  {
    path: "/signup",
    element: withSuspense(<Signup />),
  },
]);
