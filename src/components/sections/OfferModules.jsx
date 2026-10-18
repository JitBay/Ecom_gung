import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { offerModules } from '../../data/product.js';
import './OfferModules.css';

export default function OfferModules({ onSelectOffer, activeOfferId }) {
  const [activeTab, setActiveTab] = useState(activeOfferId || 1);

  const current = offerModules.find((o) => o.id === activeTab) || offerModules[0];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (onSelectOffer) onSelectOffer(id);
  };

  return (
    <section className="offers-section container" id="offres">
      <div className="section-head">
        <span className="eyebrow">Nos 4 Angles d’Accompagnement</span>
        <h2 className="title">Trouvez la raison qui vous correspond</h2>
        <p className="subtitle">
          Chaque homme a une priorité : silhouette, confort au bureau, confiance en soi ou simplicité quotidienne.
        </p>
      </div>

      <div className="offers-tabs">
        {offerModules.map((m) => (
          <button
            key={m.id}
            className={`offers-tab ${m.id === activeTab ? 'is-active' : ''}`}
            onClick={() => handleSelect(m.id)}
          >
            <span className="offers-tab__tag">Angle #{m.id}</span>
            <strong className="offers-tab__title">{m.title}</strong>
            <span className="offers-tab__sub">{m.subtitle}</span>
          </button>
        ))}
      </div>

      <div className="offer-active-card">
        <div className="offer-active-card__top">
          <div className="offer-active-card__header">
            <span className="offer-active-card__badge">
              <Icon name={current.icon} size={16} /> Angle #{current.id} — {current.title}
            </span>
            <h3>{current.tagline}</h3>
          </div>
          <div className="offer-active-card__guarantee">
            <Icon name="shield" size={24} />
            <div>
              <strong>Garantie Sérénité 30 Jours</strong>
              <p>{current.guaranteeBadge}</p>
            </div>
          </div>
        </div>

        <blockquote className="offer-active-card__hook">
          "{current.hook}"
        </blockquote>

        <div className="offer-active-card__cta-row">
          <a href="#product" className="btn btn--dark">
            Choisir mon pack avec cette offre <Icon name="arrow" size={16} />
          </a>
          <span className="offer-active-card__guarantee-micro">
            <Icon name="check" size={14} /> 30 jours pour tester chez vous · Retour simplifié
          </span>
        </div>
      </div>
    </section>
  );
}
