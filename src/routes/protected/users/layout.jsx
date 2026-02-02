import { data, NavLink, Outlet, useFetcher, useLoaderData } from 'react-router-dom';

import { getUsers, updateUserActive } from '@/services/users';

export async function loader() {
  const users = await getUsers();
  return { users };
}
export async function action({ request }) {
  const formData = await request.formData();
  const userId = formData.get('userId');
  // const active = formData.get('active') === 'true';

  try {
    await updateUserActive(userId);
  } catch (e) {
    console.error(e);
    throw data({ message: e.message }, { status: e.status });
  }

  return null;
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
  const isSubmitting = fetcher.state !== 'idle';
  const optimisticActive = fetcher.formData
    ? fetcher.formData.get('active') === 'true'
    : user.active;

  return (
    <li style={{ borderBottom: '1px solid grey' }}>
      <NavLink to={user.id}>
        {user.name} {isSubmitting ? '⏳' : null}
        {optimisticActive ? '🟢' : '🔴'}
      </NavLink>
      <fetcher.Form method="post">
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="active" value={String(!user.active)} />

        <button type="submit" style={{ padding: 2, margin: 6 }} disabled={isSubmitting}>
          {optimisticActive ? 'Disable' : 'Enable'}
        </button>
      </fetcher.Form>
    </li>
  );
}
