export function getTotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.amount, 0);
}
