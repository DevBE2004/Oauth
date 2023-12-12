import { Route, Routes } from "react-router-dom";
import { Home, Login, LoginSuccess } from "./pages/public";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-success/:uid/:tokenUrl" element={<LoginSuccess />} />
    </Routes>
  );
}

export default App;
