import { data, NavLink, Outlet, useFetcher, useLoaderData } from 'react-router-dom';

import { getUsers, toggleUserActive } from '@/services/users';

export async function loader() {
  const users = await getUsers();
  return { users };
}
export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const userId = formData.get('userId');
  if (intent !== 'toggleActive') return null;

  try {
    await toggleUserActive(userId);
    return null;
  } catch (e) {
    console.error(e);
    return data({ error: e?.message ?? 'Failed to toggle user' }, { status: e?.status ?? 500 });
  }
}

export function Component() {
  const { users } = useLoaderData();

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
              <UserRow key={user.id} user={user} />
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

function UserRow({ user }) {
  const fetcher = useFetcher();

  // ✅ optimistic только во время submit
  const isSubmitting = fetcher.state === 'submitting';

  let active = user.active;
  if (isSubmitting && fetcher.formData) {
    active = fetcher.formData.get('active') === 'true';
  }

  const error = fetcher.data?.error;

  return (
    <li style={{ borderBottom: '1px solid grey', padding: '6px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <NavLink to={user.id} style={{ flex: 1 }}>
          {user.name} {isSubmitting ? '⏳' : null} {active ? '🟢' : '🔴'}
        </NavLink>

        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="toggleActive" />
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="active" value={String(!user.active)} />

          <button type="submit" disabled={isSubmitting}>
            {active ? 'Disable' : 'Enable'}
          </button>
        </fetcher.Form>
      </div>

      {error ? <p style={{ margin: '6px 0 0', color: 'crimson' }}>{error}</p> : null}
    </li>
  );
}
