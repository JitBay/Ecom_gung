import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/ui/Icon.jsx';
import './LegalPage.css';

export default function GuaranteePage() {
  useEffect(() => {
    document.title = 'Garantie Satisfait ou Remboursé de 30 Jours | Vela Labs';
  }, []);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link> / <span>Garantie 30 Jours</span>
      </nav>

      <article className="legal-content">
        <h1>Garantie Satisfait ou Remboursé de 30 Jours</h1>
        <p className="legal-meta">Votre sérénité est notre priorité absolue.</p>

        <p>
          Chez <strong>Vela Labs</strong> (exploité par l'entité légale <strong>Vella</strong>), nous sommes convaincus de l’efficacité et du confort supérieur de nos t-shirts de compression ergonomiques <strong>Vela Sculpt™</strong>.
        </p>
        <p>
          C’est pourquoi chaque commande passée sur notre boutique est couverte par notre <strong>Garantie Satisfait ou Remboursé de 30 jours</strong>.
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

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <Link to="/#product" className="btn btn--dark" style={{ display: 'inline-flex' }}>
            Découvrir nos modèles garantis 30 jours <Icon name="arrow" size={16} />
          </Link>
        </div>
      </article>
    </div>
  );
}
