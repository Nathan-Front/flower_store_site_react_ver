import ShopFirstSection from "./ShopFirstSection.jsx";
import ShopSecondSection from "./shopSecondSection.jsx";
export default function Shop({ cartItems, updateCart }) {
  return (
    <>
      <ShopFirstSection />
      <ShopSecondSection cartItems={cartItems} updateCart={updateCart} />
    </>
  );
}
