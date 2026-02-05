import { Suspense } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; // 1. Импортируем плагин
import { Await, useLoaderData, useNavigation } from 'react-router-dom';

import { getRecentEvents, getStats } from '@/services/dashboard';

import 'dayjs/locale/ru';

export async function loader() {
  return {
    stats: await getStats(),
    recentEvents: getRecentEvents(),
  };
}

export function Component() {
  dayjs.extend(relativeTime);
  const navigation = useNavigation();
  const { stats, recentEvents } = useLoaderData();
  return (
    <div style={{ padding: 16 }}>
      <h1>Dashboard</h1>
      {navigation.state === 'loading' ? <span>...Loading</span> : null}
      <pre>{JSON.stringify(stats, null, 2)}</pre>
      <h2 style={{ marginTop: 15 }}>Recent Events:</h2>
      <Suspense fallback={<p>Загрузка данных...</p>}>
        <Await
          resolve={recentEvents}
          errorElement={<p style={{ color: 'crimson' }}>Failed to load recent events</p>}
        >
          {recentEvents => (
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 15, marginTop: 15 }}>
              {recentEvents.map(event => (
                <li
                  key={event.id}
                  style={{
                    boxShadow: '0px 1px 22px -2px rgba(0,0,0,0.55)',
                    padding: 9,
                    borderRadius: 5,
                  }}
                >
                  <p>id: {event.id}</p>
                  <p style={{ color: 'blue' }}>{event.text}</p>
                  <p>{dayjs(event.at).fromNow()}</p>
                </li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

Component.displayName = 'Dashboard';
