import Nav from "./components/navigation/Nav.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/index/home.jsx";
import Shop from "./components/shop/shop.jsx";
import About from "./components/about/about.jsx";
import ScrollToTop from "./components/hooks/scrollToTop.jsx";
import { Routes, Route, HashRouter } from "react-router-dom";
import OverlayProvider from "./components/loadingComponent/OverlayProvider.jsx";
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <OverlayProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </OverlayProvider>
    </HashRouter>
  );
}

export default App;
