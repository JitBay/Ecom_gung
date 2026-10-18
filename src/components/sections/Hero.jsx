import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon.jsx';
import Stars from '../ui/Stars.jsx';
import { products } from '../../data/catalog.js';
import './Hero.css';

const perks = [
  'Silhouette lissée sous t-shirt et chemise',
  'Maintien postural actif pour le dos et les épaules',
  'Maille 3D respirante, invisible & seconde peau',
];

export default function Hero() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const heroProducts = products.slice(0, 3);
  const currentProduct = heroProducts[selectedIdx];

  return (
    <section className="hero">
      <div className="hero__text">
        <div className="hero__rating">
          <Stars value={5} size={17} />
          <span>
            <strong>4.9</strong>/5 <i>|</i> <strong>45 000+</strong> hommes conquis
          </span>
        </div>

        <h1 className="hero__title">
          <span>Une silhouette plus nette.</span>
          <span>Un maintien postural naturel.</span>
          <span>
            Dès que vous <u>l’enfilez</u>.
          </span>
        </h1>

        <p className="hero__lead">
          Le t-shirt de compression ergonomique pour homme conçu pour <strong>lisser visuellement la silhouette sous vos vêtements</strong> et soutenir vos lombaires tout au long de la journée. Discret, respirant et sans coutures gênantes.
        </p>

        <div className="hero__model-pills" aria-label="Choisir une coupe">
          {heroProducts.map((p, idx) => (
            <button
              key={p.handle}
              className={`hero__pill ${idx === selectedIdx ? 'is-active' : ''}`}
              onClick={() => setSelectedIdx(idx)}
            >
              {p.shortTitle}
            </button>
          ))}
        </div>

        <div className="hero__cta-group">
          <a href="#product" className="btn btn--dark hero__cta">
            Commander avec la Garantie 30 Jours <Icon name="arrow" size={18} />
          </a>
        </div>

        <div className="hero__proof">
          <span>
            <Icon name="shield" size={17} /> Garantie Satisfait ou Remboursé de 30 jours
          </span>
          <span>
            <i className="live-dot" /> Expédié sous 24/48h avec suivi
          </span>
        </div>

        <ul className="hero__perks">
          {perks.map((p) => (
            <li key={p}>
              <span className="tick">
                <Icon name="check" size={12} strokeWidth={2.6} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__media">
        <div className="hero__image-card">
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.title}
            className="hero__main-photo"
          />
          <div className="hero__badge-model">
            <strong>{currentProduct.title}</strong>
            <span>{currentProduct.tagline}</span>
          </div>
        </div>

        <div className="hero__badge">
          <b>30</b>
          <div>
            <strong>Jours pour essayer</strong>
            <span>Garantie Satisfait ou Remboursé</span>
          </div>
          <p>
            <span className="tick">
              <Icon name="check" size={12} strokeWidth={2.6} />
            </span>
            Adopté par plus de 45 000 hommes au quotidien
          </p>
        </div>
      </div>
    </section>
  );
}
