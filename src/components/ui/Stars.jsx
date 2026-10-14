// Row of 5 stars; `value` can be fractional (4.8 fills 4 stars + 80% of the last).
export default function Stars({ value = 5, size = 16, color = 'var(--gold)' }) {
  return (
    <span className="stars" style={{ display: 'inline-flex', gap: 2 }} aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i)) * 100;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={`star-${i}-${fill}`}>
                <stop offset={`${fill}%`} stopColor={color} />
                <stop offset={`${fill}%`} stopColor="#d9d4cb" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#star-${i}-${fill})`}
              d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8L12 2.5z"
            />
          </svg>
        );
      })}
    </span>
  );
}
