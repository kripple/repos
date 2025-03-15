import { SvgIcon } from '@/components/SvgIcon';
import { useOnKeyDown } from '@/hooks/useOnKeyDown';
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
  const onKeyDown = useOnKeyDown();
  if (!children || !url) return null;

  return (
    <a
      className="text"
      href={url}
      onKeyDown={onKeyDown}
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
