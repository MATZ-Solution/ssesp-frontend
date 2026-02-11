import AdmissionForm from "./component/forms/admission-form";
import { router } from '../route/route';
import { RouterProvider } from "react-router-dom";
import Navbar from "./component/Navbar";

function App() {
  return (
    <div>
            {/* <Navbar /> */}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
