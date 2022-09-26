import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { useAppSelector } from "./Redux/hook";
import AllRoutes from "./Routes/AllRoutes";
function App() {
  const toggleForm = useAppSelector((state) => state.product.toggleForm);

  return (
    <div>
      {!toggleForm && <Navbar />}
      <AllRoutes />
    </div>
  );
}

export default App;
