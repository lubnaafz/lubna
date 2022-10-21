import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={ <LandingPage/> }/>
          <Route path="/home" element={ <Home/> }/>
          <Route path="/register" element={ <Register/> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
