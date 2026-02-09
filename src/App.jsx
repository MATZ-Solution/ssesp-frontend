import AdmissionForm from "./component/forms/admission-form";
import { router } from '../route/route';
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div>
      {/* <AdmissionForm /> */}
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
