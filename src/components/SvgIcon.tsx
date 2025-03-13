import type { Icon } from '@/types/svg';
import { Svg } from '@/types/svg';

const Size = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

export function SvgIcon({
  icon,
  id,
  size: sizeKey,
}: {
  icon: Icon;
  id?: string;
  size?: keyof typeof Size;
}) {
  const { drawPath, viewBox } = Svg[icon];
  const size = sizeKey ? Size[sizeKey] : Size.small;

  return (
    <svg
      aria-hidden="true"
      data-icon={icon}
      focusable="false"
      height={size}
      id={id}
      viewBox={viewBox}
    >
      <path d={drawPath}></path>
    </svg>
  );
}
