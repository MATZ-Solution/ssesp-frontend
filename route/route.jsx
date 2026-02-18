import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../utils/withSuspense";

import Login5 from "../src/component/login/login5";
import { Form1 } from "../src/component/forms/admission/form-1";
import { Form2 } from "../src/component/forms/admission/form-2";
import { Form3 } from "../src/component/forms/admission/form-3";
import { Form4 } from "../src/component/forms/admission/form-4";
import Form5 from "../src/component/forms/admission/form-5";
import Form6 from "../src/component/forms/admission/form-6";

import Dashboard from "../src/component/Dashbaord/tabs/dashboard";
import Signup from "../src/component/signup/signup";
import ProtectedRouteApplicant from "../utils/protect-route-applicant";
import ProtectedRouteForm from "../utils/protected-route-form";
import ApplicationSubmitted from "../src/component/applicationSubmitted";
import CandidatePDFDownloader from "../src/component/template/pdf-template";
import NotFound from "../src/component/not-found";
import AdminLogin from "../src/component/admin-login";
import AdminTemplate from "../src/Templates/admin-template";
import NewAdminTemplate from "../src/Templates/new-admin";
import Applications from "../src/component/Dashbaord/tabs/applications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/form/student-info-1",
    element: (
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <Form1 />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },
  {
    path: "/form/guardian-info-2",
    element: (
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <Form2 />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },
  {
    path: "/form/address-3",
    element: (
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <Form3 />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },
  {
    path: "/form/school-info-4",
    element: (
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <Form4 />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },
  {
    path: "/form/document-upload-5",
    element: (
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <Form5 />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },
  {
    path: "/form/school-preference-6",
    element: (
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <Form6 />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },

  {
    path: "/form/complete",
    element: withSuspense(
      <ProtectedRouteApplicant allowedRoles={['applicant']}>
        <ProtectedRouteForm>
          <ApplicationSubmitted />
        </ProtectedRouteForm>
      </ProtectedRouteApplicant>
    ),
  },

  {
    path: "/login",
    element: withSuspense(<Login5 />),
  },

  {
    path: "*",
    element: withSuspense(<NotFound />),
  },

  {
    path: "admin/dashboard",
    element: withSuspense(
      // <ProtectedRoute>
      <NewAdminTemplate>
      <Dashboard />
      </NewAdminTemplate>
      // </ProtectedRoute>
    )},

      {
    path: "admin/applications",
    element: withSuspense(
      // <ProtectedRoute>
      <NewAdminTemplate>
      <Applications />
      </NewAdminTemplate>
      // </ProtectedRoute>
    )},
    {
    path: "/admin-login",
    element: withSuspense(
      // <ProtectedRoute>
        <AdminLogin />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: withSuspense(<Signup />),
  },
]);
