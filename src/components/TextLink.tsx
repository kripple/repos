import { SvgIcon } from '@/components/SvgIcon';
import type { Icon } from '@/types/svg';

export function TextLink({
  children,
  icon,
  label,
  url,
}: {
  children: string | undefined | null;
  icon?: Icon;
  label?: string;
  url: string | undefined | null;
}) {
  if (!children || !url) return null;
  return (
    <a
      className="text"
      href={url}
      rel="noreferrer"
      tabIndex={0}
      target="_blank"
    >
      {icon ? <SvgIcon icon={icon} /> : null}
      {label ? <span className="label">{label}: </span> : null}
      <span className="text-content">{children}</span>
    </a>
  );
}
