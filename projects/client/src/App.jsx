import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Verify from "./pages/Verify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
