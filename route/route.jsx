import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../utils/withSuspense";

import Login5 from "../src/component/login/login5";
import { Form1 } from "../src/component/forms/admission/form-1";
import { Form2 } from "../src/component/forms/admission/form-2";
import { Form3 } from "../src/component/forms/admission/form-3";
import { Form4 } from "../src/component/forms/admission/form-4";
import Form5 from "../src/component/forms/admission/form-5";
import Form6 from "../src/component/forms/admission/form-6";

import Dashboard from "../src/component/Dashbaord/dashboard";
import Signup from "../src/component/signup/signup";
import ProtectedRoute from "../utils/protectRoute";
import ProtectedRouteForm from "../utils/protected-route-form";
import ApplicationSubmitted from "../src/component/applicationSubmitted";
import CandidatePDFDownloader from "../src/component/template/pdf-template";
import NotFound from "../src/component/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/form/student-info-1",
    element: (
      <ProtectedRoute>
        {/* <ProtectedRouteForm> */}
          <Form1 />
        {/* </ProtectedRouteForm> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/guardian-info-2",
    element: (
      <ProtectedRoute>
        <ProtectedRouteForm>
          <Form2 />
        </ProtectedRouteForm>
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/address-3",
    element: (
      <ProtectedRoute>
        <ProtectedRouteForm>
          <Form3 />
        </ProtectedRouteForm>
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/school-info-4",
    element: (
      <ProtectedRoute>
        <ProtectedRouteForm>
          <Form4 />
        </ProtectedRouteForm>
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/document-upload-5",
    element: (
      <ProtectedRoute>
        <ProtectedRouteForm>
          <Form5 />
        </ProtectedRouteForm>
      </ProtectedRoute>
    ),
  },
  {
    path: "/form/school-preference-6",
    element: (
      <ProtectedRoute>
        <ProtectedRouteForm>
          <Form6 />
        </ProtectedRouteForm>
      </ProtectedRoute>
    ),
  },

  {
    path: "/form/complete",
    element: withSuspense(
      <ProtectedRoute>
        <ProtectedRoute>
          <ApplicationSubmitted />
        </ProtectedRoute>
      </ProtectedRoute>
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

  // {
  //   path: "/dashboard",
  //   element: withSuspense(
  //     <ProtectedRoute>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  // },
  {
    path: "/signup",
    element: withSuspense(<Signup />),
  },
]);
