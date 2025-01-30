export default function Navbar({ cart }) {
  const numberOfItems = cart.reduce((total, item) => total + item.amount, 0);

  return (
    <nav>
      <h1>useReducer</h1>
      <span>{numberOfItems} items</span>
    </nav>
  );
}
