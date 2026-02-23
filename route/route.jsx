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
import ProtectedRouteAdmin from "../utils/protected-route-admin";
import {Form1View} from "../src/component/forms/admission/view-form-1";
import { Form2View } from "../src/component/forms/admission/view-form-2";
import { Form3View } from "../src/component/forms/admission/view-form-3";
import Form4View from "../src/component/forms/admission/view-form-4";

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
    path: "/admin/dashboard",
    element: withSuspense(
      <ProtectedRouteAdmin allowedRoles={['admin']}>
        <NewAdminTemplate>
          <Dashboard />
        </NewAdminTemplate>
      </ProtectedRouteAdmin>
    )
  },

  {
    path: "/admin/applications",
    element: withSuspense(
      <ProtectedRouteAdmin allowedRoles={['admin']}>
        <NewAdminTemplate>
          <Applications />
        </NewAdminTemplate>
      </ProtectedRouteAdmin>
    )
  },

  {
    path: "/admin/applications/view-form-1",
    element: withSuspense(
      <ProtectedRouteAdmin allowedRoles={['admin']}>
        <NewAdminTemplate>
          <Form1View />
        </NewAdminTemplate>
      </ProtectedRouteAdmin>
    )
  },
  {
    path: "/admin/applications/view-form-2",
    element: withSuspense(
      <ProtectedRouteAdmin allowedRoles={['admin']}>
        <NewAdminTemplate>
          <Form2View />
        </NewAdminTemplate>
      </ProtectedRouteAdmin>
    )
  },
  {
    path: "/admin/applications/view-form-3",
    element: withSuspense(
      <ProtectedRouteAdmin allowedRoles={['admin']}>
        <NewAdminTemplate>
          <Form3View />
        </NewAdminTemplate>
      </ProtectedRouteAdmin>
    )
  },
  {
    path: "/admin/applications/view-form-4",
    element: withSuspense(
      <ProtectedRouteAdmin allowedRoles={['admin']}>
        <NewAdminTemplate>
          <Form4View />
        </NewAdminTemplate>
      </ProtectedRouteAdmin>
    )
  },

  {
    path: "/admin/login",
    element: withSuspense(
      <AdminLogin />
    ),
  },
  {
    path: "/signup",
    element: withSuspense(<Signup />),
  },
  {
    path: "/view-form",
    element: withSuspense(<Form1View />),
  },
]);
