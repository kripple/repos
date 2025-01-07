// import { useRepo } from '@/hooks/useRepo';

import '@/components/repo.css';

export function Repo({ name }: { name: string }) {
  // const { currentData } = useRepo(name);

  return (
    <div className="repo">
      {name}

      {
        //currentData ? (
        // <p>{currentData.name}</p>
        // ) : // ? Object.entries(currentData).map(([key, value]) => {
        //     if (typeof value !== 'string') return null;
        //     return (
        //       <p key={key}>
        //         <strong>{key}: </strong>
        //         {typeof value !== 'string' ? 'not a string' : value}
        //       </p>
        //     );
        //   })
        //null
      }
    </div>
  );
}
