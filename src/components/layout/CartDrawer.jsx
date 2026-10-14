import Icon from '../ui/Icon.jsx';
import ProductArt from '../ui/ProductArt.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useLockScroll } from '../../lib/hooks.js';
import { price } from '../../lib/format.js';
import './CartDrawer.css';

const FREE_SHIPPING = 55;

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, total, count } = useCart();
  useLockScroll(open);
  // Multi-packs always ship free; otherwise free from €55.
  const bundleShipsFree = lines.some((l) => l.freeShipping);
  const left = bundleShipsFree ? 0 : Math.max(0, FREE_SHIPPING - total);
  const progress = bundleShipsFree ? 100 : Math.min(100, (total / FREE_SHIPPING) * 100);

  return (
    <div className={`cart-backdrop ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
      <aside className="cart" onClick={(e) => e.stopPropagation()} aria-label="Cart">
        <header className="cart__head">
          <h2>Your cart ({count})</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart">
            <Icon name="close" size={24} />
          </button>
        </header>

        <div className="cart__ship">
          <p>{left > 0 ? <>You are {price(left)} away from free shipping</> : <>🎉 You unlocked FREE shipping</>}</p>
          <i>
            <i style={{ width: `${progress}%` }} />
          </i>
        </div>

        {lines.length === 0 ? (
          <div className="cart__empty">
            <Icon name="bag" size={40} strokeWidth={1.2} />
            <p>Your cart is empty</p>
            <button className="btn btn--dark" onClick={() => setOpen(false)}>
              Continue shopping
            </button>
          </div>
        ) : (
          <ul className="cart__lines">
            {lines.map((l) => (
              <li key={l.id}>
                <div className="cart__thumb">
                  <ProductArt color={l.color} pose="side" />
                </div>
                <div className="cart__info">
                  <strong>{l.title}</strong>
                  <span>{l.detail}</span>
                  <div className="qty">
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">
                      <Icon name="minus" size={14} />
                    </button>
                    <span>{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">
                      <Icon name="plus" size={14} />
                    </button>
                  </div>
                </div>
                <div className="cart__price">
                  <strong>{price(l.price * l.qty)}</strong>
                  <s>{price(l.compareAt * l.qty)}</s>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <footer className="cart__foot">
            <p>
              <span>Subtotal</span>
              <strong>{price(total)}</strong>
            </p>
            <button className="btn btn--dark btn--block">
              <Icon name="lock" size={16} /> Checkout
            </button>
            <small>90-day money-back guarantee · Secure checkout</small>
          </footer>
        )}
      </aside>
    </div>
  );
}
