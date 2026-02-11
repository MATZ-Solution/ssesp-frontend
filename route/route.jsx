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
// import ProtectedRouteForm from "../utils/protected-route-form";
import ProtectedRoute from "../utils/protectRoute";
import ApplicationSubmitted from "../src/component/applicationSubmitted";
// import Unauthorized from "../src/component/Unauthorized";
// import PageNotFound from "../src/component/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    // element: <AdmissionForm />,
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/form/student-info",
    element: <ProtectedRoute>
      <Form1 />
    </ProtectedRoute>
    ,
  },
  {
    path: "/form/guardian-info",
    element: <ProtectedRoute>
      <Form2 />
    </ProtectedRoute>
  },
  {
    path: "/form/address",
    element: <ProtectedRoute>
      <Form3 />
    </ProtectedRoute>,
  },
  {
    path: "/form/school-info",
    element: <ProtectedRoute>
      <Form4 />
    </ProtectedRoute>,
  },
  {
    path: "/form/test-preference",
    element: <ProtectedRoute>
      <Form5 />
    </ProtectedRoute>,
  },
  {
    path: "/form/complete",
    element: withSuspense(<ProtectedRoute>
      <ApplicationSubmitted />
    </ProtectedRoute>),
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
  //   {
  //     path: "/unauthorized",
  //     element: withSuspense(<Unauthorized />),
  //   },
  //   {
  //     path: "*",
  //     element: withSuspense(<PageNotFound />),
  //   },
]);
