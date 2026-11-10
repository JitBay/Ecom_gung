export default function CountryFlag({ code = 'FR', className = '', size = 'md' }) {
  const c = String(code || 'FR').toUpperCase();
  const width = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const height = size === 'sm' ? 11 : size === 'lg' ? 17 : 14;

  const flagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: '2.5px',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
    verticalAlign: 'middle',
  };

  if (c === 'FR') {
    return (
      <span className={`country-flag country-flag--fr ${className}`} style={flagStyle} title="France">
        <svg viewBox="0 0 640 480" width="100%" height="100%" preserveAspectRatio="none">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#00267f" d="M0 0h213.3v480H0z" />
            <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
          </g>
        </svg>
      </span>
    );
  }

  if (c === 'US') {
    return (
      <span className={`country-flag country-flag--us ${className}`} style={flagStyle} title="United States">
        <svg viewBox="0 0 640 480" width="100%" height="100%" preserveAspectRatio="none">
          <g fillRule="evenodd">
            <path fill="#bd3d44" d="M0 0h640v480H0z" />
            <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640" />
            <path fill="#192f5d" d="M0 0h260v260H0z" />
            <circle cx="40" cy="35" r="10" fill="#fff" />
            <circle cx="100" cy="35" r="10" fill="#fff" />
            <circle cx="160" cy="35" r="10" fill="#fff" />
            <circle cx="220" cy="35" r="10" fill="#fff" />
            <circle cx="70" cy="70" r="10" fill="#fff" />
            <circle cx="130" cy="70" r="10" fill="#fff" />
            <circle cx="190" cy="70" r="10" fill="#fff" />
            <circle cx="40" cy="105" r="10" fill="#fff" />
            <circle cx="100" cy="105" r="10" fill="#fff" />
            <circle cx="160" cy="105" r="10" fill="#fff" />
            <circle cx="220" cy="105" r="10" fill="#fff" />
            <circle cx="70" cy="140" r="10" fill="#fff" />
            <circle cx="130" cy="140" r="10" fill="#fff" />
            <circle cx="190" cy="140" r="10" fill="#fff" />
            <circle cx="40" cy="175" r="10" fill="#fff" />
            <circle cx="100" cy="175" r="10" fill="#fff" />
            <circle cx="160" cy="175" r="10" fill="#fff" />
            <circle cx="220" cy="175" r="10" fill="#fff" />
            <circle cx="70" cy="210" r="10" fill="#fff" />
            <circle cx="130" cy="210" r="10" fill="#fff" />
            <circle cx="190" cy="210" r="10" fill="#fff" />
          </g>
        </svg>
      </span>
    );
  }

  if (c === 'CA') {
    return (
      <span className={`country-flag country-flag--ca ${className}`} style={flagStyle} title="Canada">
        <svg viewBox="0 0 640 480" width="100%" height="100%" preserveAspectRatio="none">
          <path fill="#d52b1e" d="M0 0h160v480H0zm480 0h160v480H480z" />
          <path fill="#fff" d="M160 0h320v480H160z" />
          <path
            fill="#d52b1e"
            d="M320 120l18 38 42-12-16 42 38 18-28 32 30 18-42 16 2 44-44-24-10 66h-10l-10-66-44 24 2-44-42-16 30-18-28-32 38-18-16-42 42 12z"
          />
        </svg>
      </span>
    );
  }

  if (c === 'IT') {
    return (
      <span className={`country-flag country-flag--it ${className}`} style={flagStyle} title="Italie">
        <svg viewBox="0 0 640 480" width="100%" height="100%" preserveAspectRatio="none">
          <g fillRule="evenodd" strokeWidth="1pt">
            <path fill="#fff" d="M0 0h640v480H0z" />
            <path fill="#009246" d="M0 0h213.3v480H0z" />
            <path fill="#ce2b37" d="M426.7 0H640v480H426.7z" />
          </g>
        </svg>
      </span>
    );
  }

  if (c === 'GB' || c === 'UK') {
    return (
      <span className={`country-flag country-flag--gb ${className}`} style={flagStyle} title="United Kingdom">
        <svg viewBox="0 0 640 480" width="100%" height="100%" preserveAspectRatio="none">
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path stroke="#fff" strokeWidth="60" d="M0 0l640 480M640 0L0 480" />
          <path stroke="#c8102e" strokeWidth="36" d="M0 0l640 480M640 0L0 480" />
          <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
          <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640" />
        </svg>
      </span>
    );
  }

  // Fallback default flag (France)
  return (
    <span className={`country-flag country-flag--fr ${className}`} style={flagStyle} title="France">
      <svg viewBox="0 0 640 480" width="100%" height="100%" preserveAspectRatio="none">
        <g fillRule="evenodd" strokeWidth="1pt">
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#00267f" d="M0 0h213.3v480H0z" />
          <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
        </g>
      </svg>
    </span>
  );
}
