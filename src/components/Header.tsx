import '@/components/header.css';

export function Header({ toggleId }: { toggleId: string }) {
  return (
    <header className="header">
      <label
        aria-label="theme"
        // className="header-item theme-toggle-label"
        htmlFor={toggleId}
        // tabIndex={0}
      >
        {/* {[icons.sun, icons.moon].map(({ id, drawPath, viewBox }) => (
          <Icon drawPath={drawPath} id={id} key={id} viewBox={viewBox} />
        ))} */}
      </label>
    </header>
  );
}
