import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import Icon from '../components/ui/Icon.jsx';
import './AboutPage.css';

export default function AboutPage() {
  const { lang } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = lang === 'fr'
      ? 'À propos de ZVAR · Notre Histoire & Notre Mission'
      : 'About ZVAR · Our Story & Mission';
  }, [lang]);

  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-hero container">
        <span className="about-hero__kicker">
          {lang === 'fr' ? 'NOTRE HISTOIRE & NOTRE MISSION' : 'OUR STORY & MISSION'}
        </span>
        <h1 className="about-hero__title">
          {lang === 'fr'
            ? 'Pourquoi nous avons créé ZVAR.'
            : 'Why we created ZVAR.'}
        </h1>
        <p className="about-hero__lead">
          {lang === 'fr'
            ? 'Une compression masculine pensée pour le quotidien actif des hommes : maintien postural, silhouette affinée et confort absolu sans compromis.'
            : 'Men’s compression wear engineered for active daily life: postural support, streamlined physique, and all-day comfort without compromise.'}
        </p>
      </section>

      {/* Main Story & Founder */}
      <section className="about-story container">
        <div className="about-story__grid">
          <div className="about-story__media">
            <div className="about-story__photo-card">
              <img
                src="/images/home/cat-0.jpg"
                alt={lang === 'fr' ? 'Fondateur ZVAR' : 'ZVAR Founder'}
                width="480"
                height="560"
                className="about-story__img"
                loading="eager"
              />
              <div className="about-story__caption">
                <strong>ZVAR Studio</strong>
                <span>{lang === 'fr' ? 'Conçu pour la confiance au quotidien' : 'Engineered for daily confidence'}</span>
              </div>
            </div>
          </div>

          <div className="about-story__content">
            <div className="about-story__block">
              <h2 className="about-story__heading">
                {lang === 'fr' ? 'Le constat de départ' : 'How it all started'}
              </h2>
              <p>
                {lang === 'fr'
                  ? 'Pendant trop longtemps, les hommes n’avaient que deux mauvaises options sous leurs vêtements : des maillots amples qui ne soutiennent rien et baillent sous la chemise, ou des gaines étouffantes de mauvaise qualité qui scient les côtes et deviennent insupportables après 30 minutes.'
                  : 'For too long, men had only two bad options for undershirts: loose cotton tees that offer zero support and bunch up under dress shirts, or cheap suffocating waist-trainers that pinch the ribs and feel unbearable after 30 minutes.'}
              </p>
              <p>
                {lang === 'fr'
                  ? 'Nous voulions créer une véritable troisième voie : une pièce sobre, hautement respirante et invisible, qui procure un maintien ferme immédiat tout en restant agréable à porter du matin au soir.'
                  : 'We set out to create a third way: a discreet, ultra-breathable, invisible base layer that delivers immediate firm support while staying completely comfortable from morning to night.'}
              </p>
            </div>

            <div className="about-story__block">
              <h2 className="about-story__heading">
                {lang === 'fr' ? 'La naissance de Vela Sculpt™' : 'Engineering Vela Sculpt™'}
              </h2>
              <p>
                {lang === 'fr'
                  ? 'Après des mois d’itérations sur le tissage et la répartition des tensions, nous avons mis au point la technologie Vela Sculpt™ : un maillage gainant ciblé sur la sangle abdominale combiné à des bandes de rappel croisées dans le dos pour inviter naturellement vos épaules à s’ouvrir.'
                  : 'After months of prototyping yarn blends and tension zones, we created Vela Sculpt™: targeted abdominal compression combined with ergonomic crisscross back tension bands that gently encourage shoulders back and naturally straighten posture.'}
              </p>
            </div>

            <div className="about-story__block">
              <h2 className="about-story__heading">
                {lang === 'fr' ? 'Notre promesse d’honnêteté' : 'Our commitment to real honesty'}
              </h2>
              <p>
                {lang === 'fr'
                  ? 'Pas de faux avis ni d’artifices : nous bâtissons une marque saine et durable. Nous préférons laisser la qualité de notre produit vous convaincre lors de vos essayages à la maison.'
                  : 'No fake claims, no fabricated hype: we are building a brand grounded in transparency. We let our product speak for itself during your normal everyday routines.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars of Confidence */}
      <section className="about-pillars container">
        <div className="about-pillars__grid">
          <div className="about-pillar-card">
            <span className="about-pillar-card__icon" aria-hidden="true">🛡️</span>
            <h3>{lang === 'fr' ? 'Garantie d’essai 30 jours' : '30-Day Risk-Free Trial'}</h3>
            <p>
              {lang === 'fr'
                ? 'Essayez votre Vela Sculpt™ chez vous, au travail ou en sortie. Pas totalement convaincu ? Remboursement intégral, sans poser de questions.'
                : 'Wear your Vela Sculpt™ to work or casually. Don’t love it? Full refund, no questions asked.'}
            </p>
          </div>

          <div className="about-pillar-card">
            <span className="about-pillar-card__icon" aria-hidden="true">📏</span>
            <h3>{lang === 'fr' ? '1er échange de taille offert' : '100% Free Size Exchange'}</h3>
            <p>
              {lang === 'fr'
                ? 'Un doute entre deux tailles ? Si la taille reçue n’est pas parfaite, nous vous réexpédions la bonne taille sans aucun frais supplémentaire.'
                : 'Unsure between two sizes? If the size isn’t perfect, we promptly ship you the right size with zero return fees.'}
            </p>
          </div>

          <div className="about-pillar-card">
            <span className="about-pillar-card__icon" aria-hidden="true">✉️</span>
            <h3>{lang === 'fr' ? 'Contact direct & réactif' : 'Direct & Responsive Care'}</h3>
            <p>
              {lang === 'fr'
                ? 'Une vraie équipe à votre écoute : écrivez-nous à support@zvar-shop.com, nous répondons personnellement 7j/7 sous 24 heures.'
                : 'A dedicated team that cares: email us at support@zvar-shop.com, we personally answer 7 days a week within 24 hours.'}
            </p>
          </div>
        </div>

        <div className="about-contact-banner">
          <div className="about-contact-banner__text">
            <h3>{lang === 'fr' ? 'Une question sur notre marque ou nos modèles ?' : 'Have a question about our products?'}</h3>
            <p>
              {lang === 'fr'
                ? 'Notre équipe se tient à votre entière disposition par e-mail ou via le chat en direct.'
                : 'Our customer support team is available by email or right through the live chat widget below.'}
            </p>
          </div>
          <div className="about-contact-banner__actions">
            <a href="mailto:support@zvar-shop.com" className="btn btn--gold">
              support@zvar-shop.com
            </a>
            <Link to="/products/vela-sculpt-sans-manches" className="btn btn--dark">
              {lang === 'fr' ? 'Découvrir Vela Sculpt™' : 'Explore Vela Sculpt™'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
