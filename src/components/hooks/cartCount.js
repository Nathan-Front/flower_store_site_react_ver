export function CartCount(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}
