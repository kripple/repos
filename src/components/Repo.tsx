// import { useRepo } from '@/hooks/useRepo';
import type { MouseEventHandler } from 'react';

import type { Repo as RepoType } from '@/api';
import { SvgIcon } from '@/components/SvgIcon';

import '@/components/repo.css';

export function Repo({
  data: { name, ...repo },
  hide,
  highlight,
  selected,
  select,
  close,
}: {
  data: RepoType;
  hide?: boolean;
  highlight?: string;
  selected?: boolean;
  select: OnClick;
  close: OnClick;
}) {
  // const { currentData } = useRepo(name);

  // const [selected, setSelected] = useState<string>();
  //   const selectRepo = (event) => {
  //     setSelectedRepo()
  //   }

  const __html = highlight
    ? name.replace(
        highlight,
        `<span style="color: var(--title-color); font-weight: 900">${highlight}</span>`,
      )
    : name;

  return (
    <div className={`repo${selected ? ' selected' : ''}`}>
      <option
        className="repo-contents"
        dangerouslySetInnerHTML={{ __html }}
        onClick={select as unknown as MouseEventHandler<HTMLOptionElement>} // ignore unhelpful type definitions
        role={selected ? undefined : 'button'}
        style={hide ? { display: 'none' } : undefined}
        value={name}
      ></option>
      <button
        className="close-button"
        onClick={close as unknown as MouseEventHandler<HTMLButtonElement>}
      >
        <SvgIcon icon="close" />
      </button>
    </div>
  );
}
