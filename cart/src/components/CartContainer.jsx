import { getTotal } from '../utils.js';

export default function CartContainer({
  cart,
  onClearCart,
  onRemoveItem,
  onIncreaseItem,
  onDecreaseItem,
}) {
  return (
    <section>
      <h2>Votre panier</h2>

      <div>
        {cart.map((item) => {
          return (
            <CartItem
              key={item.id}
              {...item}
              onRemoveItem={onRemoveItem}
              onIncreaseItem={onIncreaseItem}
              onDecreaseItem={onDecreaseItem}
            />
          );
        })}
      </div>

      <div>
        <button onClick={onClearCart}>Vider le panier</button>
        <p>Total : {getTotal(cart).toFixed(2)}€</p>
      </div>
    </section>
  );
}

function CartItem({
  id,
  title,
  img,
  price,
  amount,
  onRemoveItem,
  onIncreaseItem,
  onDecreaseItem,
}) {
  return (
    <article>
      <img src={img} alt={title} />

      <div>
        <h3>{title}</h3>

        <div>
          <span>{price}€</span>
        </div>

        <div>
          <button onClick={() => onDecreaseItem(id)}>-</button>
          <span> {amount} </span>
          <button onClick={() => onIncreaseItem(id)}>+</button>
        </div>

        <button onClick={() => onRemoveItem(id)}>Supprimer</button>
      </div>
    </article>
  );
}
