import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./features/Landing/Landing";
import Signup from "./features/Auth/Signup";
import SignIn from "./features/Auth/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
