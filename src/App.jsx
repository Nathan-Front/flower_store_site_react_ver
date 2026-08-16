import Nav from "./components/navigation/Nav.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/index/home.jsx";
import Shop from "./components/shop/shop.jsx";
import About from "./components/about/about.jsx";
import Contact from "./components/contact/contact.jsx";
import ScrollToTop from "./components/hooks/scrollToTop.jsx";
import { Routes, Route, HashRouter } from "react-router-dom";
import OverlayProvider from "./components/loadingComponent/OverlayProvider.jsx";
import { useState } from "react";
function App() {
  //lift up state of cart count/temporary storage
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("temporaryCart")) || [];
  });
  const updateCart = (updatedCart) => {
    localStorage.setItem("temporaryCart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  return (
    <HashRouter>
      <ScrollToTop />
      <OverlayProvider>
        <Nav cartItems={cartItems} updateCart={updateCart} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={<Shop cartItems={cartItems} updateCart={updateCart} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </OverlayProvider>
    </HashRouter>
  );
}

export default App;
