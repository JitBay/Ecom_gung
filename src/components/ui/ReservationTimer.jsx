import Icon from './Icon.jsx';
import { useReservationTimer } from '../../lib/hooks.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './ReservationTimer.css';

export default function ReservationTimer({ variant = 'cart' }) {
  const { lang } = useLanguage();
  const { formattedTime } = useReservationTimer(10);

  const isCart = variant === 'cart';

  return (
    <div
      className={`res-timer res-timer--${variant}`}
      role="status"
      aria-live="polite"
    >
      <div className="res-timer__icon-wrap">
        <Icon name="clock" size={17} strokeWidth={2.2} />
        <span className="res-timer__pulse-dot" aria-hidden="true" />
      </div>

      <div className="res-timer__content">
        <div className="res-timer__headline">
          <span>
            {lang === 'fr'
              ? isCart
                ? 'Panier réservé pendant'
                : 'Articles réservés pendant'
              : isCart
                ? 'Cart reserved for'
                : 'Items reserved for'}{' '}
          </span>
          <span className="res-timer__digits">{formattedTime} min</span>
        </div>
        <div className="res-timer__sub">
          {lang === 'fr'
            ? 'Finalisez votre commande avant expiration pour sécuriser vos réductions.'
            : 'Complete checkout before time expires to secure your discount.'}
        </div>
      </div>
    </div>
  );
}
