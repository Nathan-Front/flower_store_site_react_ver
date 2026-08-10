import Nav from "./components/navigation/Nav.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/index/home.jsx";
import { Routes, Route, HashRouter } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
