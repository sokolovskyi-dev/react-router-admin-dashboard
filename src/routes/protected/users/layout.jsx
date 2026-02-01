import { NavLink, Outlet, useFetcher, useLoaderData } from 'react-router-dom';

import { getUsers } from '@/services/users';

export async function loader() {
  const users = await getUsers();
  return { users };
}

export function Component() {
  const { users } = useLoaderData();
  const fetcher = useFetcher();

  return (
    <>
      <div style={{ display: 'flex', gap: 40 }}>
        <aside
          style={{
            borderRight: '1px solid #ddd',
            padding: '12px',
          }}
        >
          <h3>Users</h3>
          <ul>
            {users.map(user => (
              <li key={user.id} style={{ borderBottom: '1px solid grey' }}>
                <NavLink to={user.id}>
                  {user.name} {user.active ? '🟢' : '🔴'}
                </NavLink>
                <fetcher.Form method="post">
                  <button name="toggleActive" style={{ padding: 2, margin: 6 }}>
                    {user.active ? 'Disable' : 'Enable'}
                  </button>
                </fetcher.Form>
              </li>
            ))}
          </ul>

          <hr />

          <NavLink to="new" end>
            ➕ New user
          </NavLink>
        </aside>

        <section style={{ padding: '16px' }}>
          <Outlet />
        </section>
      </div>
    </>
  );
}

Component.displayName = 'UsersLayout';
