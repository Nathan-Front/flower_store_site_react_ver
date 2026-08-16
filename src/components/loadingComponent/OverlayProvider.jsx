import { useState, useEffect } from "react";
import { OverlayContext } from "./OverlayContext.jsx";
import Overlay from "./Overlay.jsx";
export default function OverlayProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <OverlayContext.Provider value={{ isOpen, setIsOpen, setSpinner }}>
      {children}
      {isOpen && <Overlay type={spinner} />}
    </OverlayContext.Provider>
  );
}
