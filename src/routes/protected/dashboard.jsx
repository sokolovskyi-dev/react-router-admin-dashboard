import { useLoaderData } from 'react-router-dom';

import { getStats } from '@/services/dashboard';

export async function loader() {
  const stats = await getStats();
  return { stats };
}

export function Component() {
  const { stats } = useLoaderData();
  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
