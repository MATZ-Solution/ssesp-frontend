import { router } from '../route/route';
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
