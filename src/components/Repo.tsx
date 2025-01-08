// import { useRepo } from '@/hooks/useRepo';

import '@/components/repo.css';

export function Repo({
  hide,
  highlight,
  name,
}: {
  hide?: boolean;
  highlight?: string;
  name: string;
}) {
  // const { currentData } = useRepo(name);

  return (
    <div
      className="repo"
      dangerouslySetInnerHTML={{
        __html: highlight
          ? name.replace(
              highlight,
              `<span style="color: var(--title-color); font-weight: 900">${highlight}</span>`,
            )
          : name,
      }}
      style={hide ? { display: 'none' } : undefined}
    ></div>
  );
}
