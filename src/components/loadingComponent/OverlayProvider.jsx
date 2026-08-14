import { useState } from "react";
import { OverlayContext } from "./OverlayContext.jsx";
import Overlay from "./Overlay.jsx";
export default function OverlayProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [spinner, setSpinner] = useState(null);
  return (
    <OverlayContext.Provider value={{ isOpen, setIsOpen, setSpinner }}>
      {children}
      {isOpen && <Overlay type={spinner} />}
    </OverlayContext.Provider>
  );
}
