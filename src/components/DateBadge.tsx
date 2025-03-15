import '@/components/date-badge.css';

export function DateBadge({ date: value }: { date?: string }) {
  if (!value) return null;
  const date = new Date(value);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.toLocaleDateString('en-US', { year: 'numeric' });

  return (
    <div className="date-badge">
      <span className="month">{month}</span>
      <span className="year">{year}</span>
    </div>
  );
}
