const SCHOOL_METRICS = [
  { label: 'Students', value: '1,284', change: '12.4%' },
  { label: 'Attendance', value: '96.8%', change: '2.1%' },
  { label: 'Classes', value: '32', change: '4 new' },
];
const BAR_HEIGHTS = [40, 62, 49, 78, 60, 88, 74, 94, 82, 98, 72, 90];

export default function SchoolPreview() {
  return (
    <>
      <div className="mockheading">
        School overview <small>2026 academic year</small>
      </div>
      <div className="mockstats">
        {SCHOOL_METRICS.map(({ label, value, change }) => (
          <div key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <em>↗ {change}</em>
          </div>
        ))}
      </div>
      <div className="mockbars">
        {BAR_HEIGHTS.map((height, index) => (
          <i key={index} style={{ height: `${height}%` }} />
        ))}
      </div>
    </>
  );
}
