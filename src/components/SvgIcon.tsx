import type { Icon } from '@/types/svg';
import { Svg } from '@/types/svg';

const Size = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

export function SvgIcon({
  icon,
  ...props
}: {
  icon: Icon;
  id?: string;
  size?: keyof typeof Size;
}) {
  const drawPath = Svg[icon];
  const size = props.size ? Size[props.size] : Size.small;

  return (
    <svg
      aria-hidden="true"
      data-icon={icon}
      focusable="false"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      <path d={drawPath}></path>
    </svg>
  );
}
