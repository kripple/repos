import { SvgIcon } from '@/components/SvgIcon';
import type { Icon } from '@/types/svg';

export function Text({
  children,
  icon,
  label,
}: {
  children: string | undefined | null;
  icon?: Icon;
  label: string;
}) {
  if (!children) return null;
  return (
    <div className="text">
      {icon ? <SvgIcon icon={icon} /> : null}
      <span className="label">{label}: </span>
      <span className="text-content">{children}</span>
    </div>
  );
}
