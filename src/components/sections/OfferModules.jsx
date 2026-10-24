import { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import { offerModules, offerModulesEn } from '../../data/product.js';
import { useLanguage } from '../../context/LanguageContext.jsx';
import './OfferModules.css';

export default function OfferModules({ onSelectOffer, activeOfferId }) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(activeOfferId || 1);

  const modules = lang === 'fr' ? offerModules : (offerModulesEn || offerModules);
  const current = modules.find((o) => o.id === activeTab) || modules[0];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (onSelectOffer) onSelectOffer(id);
  };

  return (
    <section className="offers-section container" id="offres">
      <div className="section-head">
        <span className="eyebrow">
          {lang === 'fr' ? 'Nos Solutions d’Accompagnement' : 'Our Support Solutions'}
        </span>
        <h2 className="title">
          {lang === 'fr'
            ? 'Trouvez la raison qui vous correspond'
            : 'Find the benefit that matters most to you'}
        </h2>
        <p className="subtitle">
          {lang === 'fr'
            ? 'Chaque homme a une priorité : silhouette, confort au bureau, confiance en soi ou simplicité quotidienne.'
            : 'Every man has a priority: cleaner silhouette, desk comfort, restored confidence, or effortless simplicity.'}
        </p>
      </div>

      <div className="offers-tabs">
        {modules.map((m) => (
          <button
            key={m.id}
            className={`offers-tab ${m.id === activeTab ? 'is-active' : ''}`}
            onClick={() => handleSelect(m.id)}
          >
            <strong className="offers-tab__title">{m.title}</strong>
            <span className="offers-tab__sub">{m.subtitle}</span>
          </button>
        ))}
      </div>

      <div className="offer-active-card">
        <div className="offer-active-card__top">
          <div className="offer-active-card__header">
            <span className="offer-active-card__badge">
              <Icon name={current.icon} size={16} /> {current.title}
            </span>
            <h3>{current.tagline}</h3>
          </div>
          <div className="offer-active-card__guarantee">
            <Icon name="shield" size={24} />
            <div>
              <strong>
                {lang === 'fr' ? 'Garantie Sérénité 30 Jours' : '30-Day Money-Back Guarantee'}
              </strong>
              <p>{current.guaranteeBadge}</p>
            </div>
          </div>
        </div>

        <blockquote className="offer-active-card__hook">
          "{current.hook}"
        </blockquote>

        <div className="offer-active-card__cta-row">
          <a href="#product" className="btn btn--dark">
            {lang === 'fr' ? 'Choisir mon pack avec cette offre' : 'Choose my pack with this offer'}{' '}
            <Icon name="arrow" size={16} />
          </a>
          <span className="offer-active-card__guarantee-micro">
            <Icon name="check" size={14} />{' '}
            {lang === 'fr'
              ? '30 jours pour tester chez vous · Retour simplifié'
              : '30 days to test at home · Hassle-free returns'}
          </span>
        </div>
      </div>
    </section>
  );
}
