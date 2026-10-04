export default function SecurityPreview() {
  return (
    <>
      <div className="mockheading">
        Security at a glance{' '}
        <small>
          All systems operational <em>●</em>
        </small>
      </div>
      <div className="chartvisual">
        <div className="chartgrid" />
        <svg viewBox="0 0 400 120">
          <path
            d="M0 100 L35 78 L65 88 L95 44 L130 64 L160 35 L195 57 L230 20 L260 39 L295 14 L330 30 L365 9 L400 18"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M0 100 L35 78 L65 88 L95 44 L130 64 L160 35 L195 57 L230 20 L260 39 L295 14 L330 30 L365 9 L400 18 V120 H0 Z"
            fill="var(--accent)"
            opacity=".09"
          />
        </svg>
      </div>
      <div className="securityrow">
        <span>◉ Threat monitoring</span>
        <em>Active</em>
      </div>
    </>
  );
}
