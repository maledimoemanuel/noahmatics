import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./features/Landing/Landing";
import Signup from "./features/Auth/Signup";
import SignIn from "./features/Auth/SignIn";
import Dashboard from "./features/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
