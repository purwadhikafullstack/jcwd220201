import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

function App() {
  const register = useSelector((state) => state.register);
  return (
    <>
      <Routes>
        <Route
          path="/register"
          // element={register.isSubmitted ? <Register /> : <Verify />}
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;
