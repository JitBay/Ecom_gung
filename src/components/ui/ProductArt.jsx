// Placeholder product photo: a simple figure wearing a sports bra and leggings in the chosen colour.
// Replace with <img src="/images/..." /> once you have real photos.
import './ProductArt.css';

const SKIN = '#d2a98f';
const HAIR = '#2b211c';

// pose "side" leans the figure, "back" mirrors it, "front" is straight.
const poseTransform = {
  front: '',
  side: 'rotate(-3 110 330)',
  back: 'translate(220 0) scale(-1 1)',
};

const legs = 'M84 128 Q110 134 136 128 L140 168 Q142 240 133 324 L117 324 Q114 250 111 200 L109 200 Q106 250 103 324 L87 324 Q78 240 80 168 Z';

export default function ProductArt({ color = '#1d1d1f', pose = 'front', className = '' }) {
  return (
    <div className={`product-art ${className}`}>
      <svg viewBox="0 0 220 360" role="img" aria-label="Leggings product photo placeholder">
        <defs>
          <pattern id="rib" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(75)">
            <line x1="0" y1="0" x2="0" y2="5" stroke="#fff" strokeWidth="1.1" />
          </pattern>
          <linearGradient id="shade" x1="0" x2="1">
            <stop offset="0" stopColor="#000" stopOpacity=".18" />
            <stop offset=".45" stopColor="#fff" stopOpacity=".08" />
            <stop offset="1" stopColor="#000" stopOpacity=".22" />
          </linearGradient>
        </defs>
        <ellipse cx="110" cy="334" rx="52" ry="6" fill="rgba(0,0,0,.1)" />
        <g transform={poseTransform[pose] ?? ''}>
          {/* hair bun, head, neck */}
          <circle cx="112" cy="16" r="9" fill={HAIR} />
          <ellipse cx="110" cy="38" rx="14" ry="17" fill={SKIN} />
          <path d="M96 36 Q96 20 110 20 Q125 20 124 36 Q118 26 110 27 Q101 28 96 36Z" fill={HAIR} />
          <rect x="104" y="52" width="12" height="14" rx="4" fill={SKIN} />
          {/* arms and torso */}
          <path d="M88 70 Q77 74 75 100 L71 146 Q71 153 77 152 L81 146 L87 104 Z" fill={SKIN} />
          <path d="M132 70 Q143 74 145 100 L149 146 Q149 153 143 152 L139 146 L133 104 Z" fill={SKIN} />
          <path d="M88 68 Q110 61 132 68 L135 100 Q131 118 134 130 L86 130 Q89 118 85 100 Z" fill={SKIN} />
          {/* sports bra */}
          <path d="M88 70 Q110 63 132 70 L134 102 Q110 109 86 102 Z" fill={color} />
          <path d="M88 70 Q110 63 132 70 L134 102 Q110 109 86 102 Z" fill="url(#shade)" />
          {/* leggings with ribbed texture and shading */}
          <path d={legs} fill={color} />
          <path d={legs} fill="url(#rib)" opacity=".16" />
          <path d={legs} fill="url(#shade)" />
          <path d="M84 128 Q110 134 136 128 L136.6 136 Q110 142 83.6 136 Z" fill="rgba(255,255,255,.12)" />
          {/* sneakers */}
          <path d="M84 322 h20 q4 0 4 6 v4 h-27 q-2-10 3-10Z" fill="#f5f5f3" stroke="#d9d9d6" />
          <path d="M116 322 h20 q5 0 3 10 h-27 v-4 q0-6 4-6Z" fill="#f5f5f3" stroke="#d9d9d6" />
        </g>
      </svg>
    </div>
  );
}
