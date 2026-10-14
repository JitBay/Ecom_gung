import { useState } from 'react';
import Icon from './Icon.jsx';
import './Accordion.css';

// items: [{ title, content, tag? }]. Only one panel is open at a time.
export default function Accordion({ items, variant = 'line', icon = 'chevron' }) {
  const [open, setOpen] = useState(null);
  return (
    <div className={`accordion accordion--${variant}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div className={`accordion__item ${isOpen ? 'is-open' : ''}`} key={item.title}>
            <button className="accordion__head" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
              {item.tag && <span className="accordion__tag">{item.tag}</span>}
              <span className="accordion__title">{item.title}</span>
              <span className="accordion__icon">
                <Icon name={icon === 'plus' ? (isOpen ? 'minus' : 'plus') : 'chevron'} size={16} />
              </span>
            </button>
            <div className="accordion__panel">
              <div className="accordion__inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
