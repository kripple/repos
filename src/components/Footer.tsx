export function Footer() {
  const creator = 'Kelly Ripple';
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} ${creator}`;

  return <footer className="footer">{copyright}</footer>;
}
