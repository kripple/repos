import '@/components/highlight.css';

export function Highlight({
  highlight: searchTerm,
  name,
}: {
  highlight?: string;
  name: string;
}) {
  const getSubstrings = () => {
    if (!searchTerm) return {};

    const start = name.toLowerCase().indexOf(searchTerm.toLowerCase());
    const end = start + searchTerm.length;

    const before = start > 0 ? name.substring(0, start) : undefined;
    const highlight = name.substring(start, end);
    const after = end < name.length ? name.substring(end) : undefined;

    return { before, highlight, after };
  };

  const { before, highlight, after } = getSubstrings();

  return (
    <span className="repo-name">
      {before}
      {highlight ? <span className="highlight">{highlight}</span> : name}
      {after}
    </span>
  );
}
