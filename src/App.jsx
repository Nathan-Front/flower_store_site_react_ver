import Nav from "./components/navigation/Nav.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/index/home.jsx";
import { Routes, Route, HashRouter } from "react-router-dom";
import OverlayProvider from "./components/loadingComponent/OverlayProvider.jsx";
function App() {
  return (
    <HashRouter>
      <OverlayProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </OverlayProvider>
    </HashRouter>
  );
}

export default App;
