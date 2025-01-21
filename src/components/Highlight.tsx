import '@/components/highlight.css';

export function Highlight({
  highlight: searchTerm,
  name,
}: {
  highlight?: string;
  name: string;
}) {
  const getSubstrings = () => {
    if (!searchTerm) return;

    const start = name.toLowerCase().indexOf(searchTerm.toLowerCase());
    const end = start + searchTerm.length;

    const before = start > 0 ? name.substring(0, start) : undefined;
    const highlight = name.substring(start, end);
    const after = end < name.length ? name.substring(end) : undefined;

    return { before, highlight, after };
  };
  const substrings = getSubstrings();

  return (
    <span className="repo-name">
      {substrings?.before}
      {substrings?.highlight ? (
        <span className="highlight">{substrings.highlight}</span>
      ) : (
        name
      )}
      {substrings?.after}
    </span>
  );
}
