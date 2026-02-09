import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../utils/withSuspense";

import Login1 from "../src/component/login/login1";
import Login2 from "../src/component/login/login2";
import Login3 from "../src/component/login/login3";
import Login4 from "../src/component/login/login4";
import Login5 from "../src/component/login/login5";

import AdmissionForm from "../src/component/forms/admission-form";
// import Unauthorized from "../src/component/Unauthorized";
// import PageNotFound from "../src/component/PageNotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdmissionForm />, // or redirect if you want
    // element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: withSuspense(<Login5 />),
  },
  {
    path: "/admission-form",
    element: withSuspense(<AdmissionForm />),
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
