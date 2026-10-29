import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import './LegalPage.css';

export default function PrivacyPolicyPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Politique de confidentialité | Vella — Vela Labs'
        : 'Privacy Policy | Vella — Vela Labs';
  }, [lang]);

  return (
    <div className="legal-page container">
      <nav className="pp__crumbs" aria-label={lang === 'fr' ? "Fil d'Ariane" : 'Breadcrumbs'}>
        <Link to="/">{t('nav.home')}</Link> / <span>{t('footer.privacy_policy')}</span>
      </nav>

      <article className="legal-content">
        <h1>VELLA — PRIVACY POLICY</h1>
        <p className="legal-meta"><strong>Effective date:</strong> October 14, 2026</p>
        <p>
          This Privacy Policy explains how Vella collects, uses, stores and protects personal information when you visit or make a purchase through [VELLA WEBSITE URL] (the “Site”).
        </p>
        <p>
          The Site is operated by [LEGAL BUSINESS NAME], trading as Vella, with its business address at [FULL BUSINESS ADDRESS].
        </p>
        <p>
          For privacy-related questions, contact us at [PRIVACY CONTACT EMAIL].
        </p>

        <hr />

        <h2>PERSONAL INFORMATION WE COLLECT</h2>
        <p>Depending on how you interact with the Site, we may collect the following categories of personal information.</p>
        <ul>
          <li><strong>Contact information:</strong> name, email address, billing address, shipping address and telephone number where needed.</li>
          <li><strong>Order information:</strong> products purchased, selected sizes and colors, quantities, order history, delivery details, returns, refunds and customer service records.</li>
          <li><strong>Payment information:</strong> payments are processed through the payment providers available at checkout. These providers may process information necessary to authorize and complete your transaction. Please do not send full payment card details to us by email or messaging.</li>
          <li><strong>Technical and browsing information:</strong> IP address, browser type, operating system, device information, pages viewed, interactions with the Site, cart activity and related technical information.</li>
          <li><strong>Communications and preferences:</strong> messages you send to our support team, feedback, product reviews you choose to submit and your marketing or cookie preferences.</li>
        </ul>
        <p>Cookies and similar technologies may collect certain information automatically, subject to applicable law and your choices.</p>

        <h2>HOW WE USE PERSONAL INFORMATION</h2>
        <p>We use personal information for the following purposes:</p>
        <ul>
          <li>To process orders, payments, shipping, returns and refunds.</li>
          <li>To respond to customer inquiries and provide customer support.</li>
          <li>To maintain and secure the Site and help prevent fraud.</li>
          <li>To comply with legal, tax, accounting and regulatory obligations.</li>
          <li>To understand Site performance and improve our products and services.</li>
          <li>To send marketing communications where permitted by law and, where required, with your consent.</li>
          <li>To measure advertising effectiveness and personalize advertising, if relevant tools are enabled and the required legal basis or consent is in place.</li>
        </ul>
        <p>
          We do not use this Policy as a statement that every possible tool or advertising integration is active. Our actual practices depend on the services configured on the Site.
        </p>

        <h2>LEGAL BASES FOR PROCESSING</h2>
        <p>Where required by applicable privacy law, we process personal information on one or more of the following bases:</p>
        <ul>
          <li><strong>Contract:</strong> to process and fulfil your order.</li>
          <li><strong>Legal obligation:</strong> to meet applicable legal and accounting requirements.</li>
          <li><strong>Legitimate interests:</strong> to secure our Site, prevent fraud, respond to inquiries and improve our services, where these interests do not override your rights.</li>
          <li><strong>Consent:</strong> for processing activities that require consent, such as certain marketing communications or non-essential cookies.</li>
        </ul>
        <p>You may withdraw consent at any time where processing is based on consent. Withdrawal does not affect processing carried out lawfully before withdrawal.</p>

        <h2>SHOPIFY AND SERVICE PROVIDERS</h2>
        <p>
          Our online store is hosted on Shopify. Shopify and other service providers may process information to provide hosting, checkout, payment processing, security, order management, customer support and related services.
        </p>
        <p>
          We may also use shipping providers, email services, analytics tools, marketing platforms and fraud prevention providers, depending on the integrations active on the Site.
        </p>
        <p>
          These providers may process information in countries other than your own. Where required, we use appropriate safeguards for international data transfers.
        </p>
        <p>
          Shopify privacy information is available at: <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer">https://www.shopify.com/legal/privacy</a>
        </p>

        <h2>DISCLOSURE OF PERSONAL INFORMATION</h2>
        <p>We may disclose personal information to:</p>
        <ul>
          <li>Shopify and other hosting or e-commerce service providers;</li>
          <li>Payment processors and fraud prevention providers;</li>
          <li>Shipping, fulfilment and returns providers;</li>
          <li>Customer service and communications providers;</li>
          <li>Analytics and advertising partners, if enabled and permitted by law;</li>
          <li>Professional advisers, auditors and insurers where necessary;</li>
          <li>Authorities where disclosure is required by law;</li>
          <li>A successor or purchaser in connection with a business transfer, subject to applicable law.</li>
        </ul>
        <p>
          We do not disclose personal information indiscriminately. Access is limited to what is reasonably necessary for the relevant purpose, subject to the applicable legal requirements.
        </p>

        <h2>COOKIES AND SIMILAR TECHNOLOGIES</h2>
        <p>
          The Site may use cookies and similar technologies to keep the store working, remember preferences, analyze traffic and, where enabled, measure or personalize advertising.
        </p>
        <p>
          Strictly necessary cookies may support the shopping cart, checkout, security and privacy preferences.
        </p>
        <p>
          Analytics, functional and advertising technologies may be used depending on the Site's configuration.
        </p>
        <p>
          Where required by law, non-essential cookies and tracking technologies will be activated only after the required consent has been obtained. You can change your preferences through the cookie settings available on the Site.
        </p>
        <p>
          The precise cookies, providers and retention periods depend on our current Shopify configuration and the apps or integrations we use.
        </p>

        <h2>DATA RETENTION</h2>
        <p>
          We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, including order fulfilment, customer support, fraud prevention, legal compliance and dispute resolution.
        </p>
        <p>
          Some transaction and accounting records may need to be retained for periods required by law. Other information may be deleted or anonymized when it is no longer needed, subject to legal obligations.
        </p>

        <h2>DATA SECURITY</h2>
        <p>
          We use reasonable technical and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse or disclosure.
        </p>
        <p>
          No method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>
        <p>
          If a personal data incident occurs, we will take the steps required by applicable law.
        </p>

        <h2>YOUR PRIVACY RIGHTS</h2>
        <p>
          Depending on your location and the law that applies, you may have the right to request access to, correction of, deletion of, or a copy of your personal information, to object to certain processing, to restrict processing, or to withdraw consent.
        </p>
        <p>
          To make a privacy request, contact [PRIVACY CONTACT EMAIL]. We may need to verify your identity before responding.
        </p>
        <p>
          You may also have the right to complain to the relevant privacy or data protection regulator.
        </p>

        <h2>MARKETING CHOICES</h2>
        <p>
          You may unsubscribe from marketing emails by using the unsubscribe link in the message.
        </p>
        <p>
          If we offer SMS marketing, you may opt out by following the instructions provided in the message, such as replying STOP where supported.
        </p>
        <p>
          You may continue to receive non-marketing communications necessary to fulfil an order or respond to a request.
        </p>

        <h2>UNITED STATES PRIVACY NOTICES</h2>
        <p>
          Depending on the laws applicable to your state, you may have additional rights to know, access, correct or delete personal information, obtain a portable copy, or opt out of certain sales, sharing or targeted advertising.
        </p>
        <p>
          If Vella is subject to a law requiring an opt-out mechanism, the relevant option will be provided through the Site or by contacting [PRIVACY CONTACT EMAIL].
        </p>
        <p>
          Where applicable, we will honor recognized opt-out preference signals as required by law. We will not discriminate against consumers for exercising applicable privacy rights.
        </p>
        <p>
          The exact rights available depend on the applicable law and the nature of our processing activities.
        </p>

        <h2>EUROPEAN ECONOMIC AREA AND UNITED KINGDOM</h2>
        <p>
          If you are located in the European Economic Area or the United Kingdom, you may have rights under applicable data protection law, including rights of access, rectification, erasure, restriction, objection and data portability, subject to legal conditions.
        </p>
        <p>
          You may also complain to your local data protection authority. In France, the supervisory authority is the CNIL: <a href="https://www.cnil.fr/" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/</a>
        </p>
        <p>
          Where required, we rely on appropriate safeguards for transfers of personal information outside the EEA or UK.
        </p>

        <h2>AUSTRALIAN PRIVACY RIGHTS</h2>
        <p>
          If Australian privacy law applies to Vella's handling of your information, you may have rights to request access to or correction of personal information and to make a privacy complaint.
        </p>
        <p>
          To raise a concern, contact [PRIVACY CONTACT EMAIL]. We will review and respond in accordance with applicable law.
        </p>
        <p>
          You may also contact the relevant Australian privacy regulator where appropriate.
        </p>

        <h2>CHILDREN</h2>
        <p>
          The Site is not intended to collect children's personal information in breach of applicable law. We do not knowingly collect information from children where doing so is prohibited.
        </p>
        <p>
          If you believe a child has provided personal information inappropriately, please contact us so that we can review the matter.
        </p>

        <h2>THIRD-PARTY LINKS</h2>
        <p>
          The Site may contain links to third-party websites or services. Their privacy practices are governed by their own policies. We encourage you to review those policies before providing personal information to them.
        </p>

        <h2>CHANGES TO THIS POLICY</h2>
        <p>
          We may update this Privacy Policy to reflect changes in our business, services, technologies or legal obligations.
        </p>
        <p>
          The updated version will be posted on the Site with a revised effective date. Where required by law, we will provide additional notice.
        </p>

        <h2>CONTACT US</h2>
        <p>For privacy questions or requests, contact:</p>
        <p>
          <strong>Vella — Privacy Team</strong><br />
          Legal business name: [LEGAL BUSINESS NAME]<br />
          Business address: [FULL BUSINESS ADDRESS]<br />
          Email: [PRIVACY CONTACT EMAIL]<br />
          Website: [VELLA WEBSITE URL]
        </p>
        <p style={{ marginTop: 20, fontStyle: 'italic', fontWeight: 600 }}>
          Vella — Your Style. Your Comfort. Your Confidence.
        </p>
      </article>
    </div>
  );
}
