import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function GuaranteePage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Garantie satisfait ou remboursé de 30 jours | Vela Labs'
        : '30-Day Money-Back Guarantee | Vela Labs';
  }, [lang]);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
        <Link to="/">{t('nav.home')}</Link> / <span>{t('nav.guarantee')}</span>
      </nav>

      <article className="legal-content">
        <h1>
          {lang === 'fr'
            ? 'Garantie satisfait ou remboursé de 30 jours'
            : '30-Day Money-Back Guarantee'}
        </h1>
        <p className="legal-meta">
          {lang === 'fr'
            ? 'Votre sérénité est notre priorité absolue.'
            : 'Your peace of mind is our absolute priority.'}
        </p>

        {lang === 'fr' ? (
          <>
            <p>
              Chez <strong>Vela Labs</strong> (exploité par l'entité légale <strong>Vella</strong>), nous sommes convaincus de l’efficacité et du confort supérieur de nos t-shirts de compression ergonomiques <strong>Vela Sculpt™</strong>.
            </p>
            <p>
              C’est pourquoi chaque commande passée sur notre boutique est couverte par notre <strong>Garantie satisfait ou remboursé de 30 jours</strong>.
            </p>

            <hr />

            <h2>Comment fonctionne notre garantie de 30 jours ?</h2>
            <ol style={{ paddingLeft: 22, lineHeight: 1.8 }}>
              <li>
                <strong>30 jours d’essai dans votre quotidien :</strong> À compter du jour où vous recevez votre colis, vous disposez de 30 jours pour enfiler votre t-shirt, le porter au travail sous vos chemises, au sport ou en sortie, et évaluer le confort, l'effet gainant et le maintien postural.
              </li>
              <li>
                <strong>Pas de question piège :</strong> Si la coupe ne vous convient pas, si la taille n’est pas optimale ou si vous n’êtes pas 100% satisfait du rendu sous vos vêtements, vous pouvez demander un échange de taille gratuit ou un remboursement intégral.
              </li>
              <li>
                <strong>Procédure de retour simple et rapide :</strong> Envoyez simplement un email à <code>support@velalabs.co</code> en mentionnant votre numéro de commande. Notre équipe vous transmettra l'adresse de retour et les instructions sous 24h.
              </li>
              <li>
                <strong>Remboursement rapide :</strong> Dès réception et vérification de votre retour par notre centre logistique, votre remboursement est immédiatement émis sur votre mode de paiement initial (carte bancaire, Apple Pay ou PayPal).
              </li>
            </ol>

            <h2>Conditions d’application</h2>
            <ul>
              <li>La demande de retour doit être formulée dans les 30 jours calendaires suivant la date de livraison.</li>
              <li>Les articles doivent être retournés en bon état, propres et avec leurs étiquettes d'origine.</li>
              <li>En cas d'erreur de taille, le premier échange de taille est entièrement pris en charge.</li>
            </ul>
          </>
        ) : (
          <>
            <p>
              At <strong>Vela Labs</strong> (operated by legal entity <strong>Vella</strong>), we stand firmly behind the performance, fit, and all-day comfort of our <strong>Vela Sculpt™</strong> ergonomic compression wear.
            </p>
            <p>
              That’s why every order placed on our store is backed by our comprehensive <strong>30-Day Money-Back Guarantee</strong>.
            </p>

            <hr />

            <h2>How does our 30-day guarantee work?</h2>
            <ol style={{ paddingLeft: 22, lineHeight: 1.8 }}>
              <li>
                <strong>30 days of real-world wear:</strong> From the day your package is delivered, you have 30 full days to wear your shirt to work, casually, or on the move, and experience the slimming and postural benefits firsthand.
              </li>
              <li>
                <strong>No catches, no friction:</strong> If the fit isn't right, the size isn't ideal, or you aren't completely thrilled with the results under your clothes, request a free size exchange or a full refund.
              </li>
              <li>
                <strong>Simple return process:</strong> Just email <code>support@velalabs.co</code> with your order number. Our support team replies within 24 hours with return instructions.
              </li>
              <li>
                <strong>Prompt refunds:</strong> Once received and verified at our fulfillment center, your refund is credited straight to your original payment method (card, Apple Pay, PayPal).
              </li>
            </ol>

            <h2>Terms & Guidelines</h2>
            <ul>
              <li>Return requests must be initiated within 30 calendar days of delivery.</li>
              <li>Items should be returned clean and in good condition with original tags intact.</li>
              <li>Your first size exchange is always 100% free of charge.</li>
            </ul>
          </>
        )}

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link to="/#product" className="btn btn--dark" style={{ display: 'inline-flex' }}>
            {lang === 'fr' ? 'Découvrir nos modèles garantis 30 jours' : 'Explore 30-Day Guaranteed Styles'}{' '}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </article>
    </div>
  );
}
