import Navbar from "../component/Navbar";

function AdminTemplate({ 
  children, 

}) {

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main  >
        <Navbar/>
        {children}
      </main>
    </div>
  );
}

export default AdminTemplate;