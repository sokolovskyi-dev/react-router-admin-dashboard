import { NavLink, Outlet } from 'react-router-dom';

export function Component() {
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
            <li>
              <NavLink to="1">User-1</NavLink>
            </li>
            <li>
              <NavLink to="2">User-2</NavLink>
            </li>
            <li>
              <NavLink to="3">User-3</NavLink>
            </li>
            <li>
              <NavLink to="4">User-4</NavLink>
            </li>
            <li>
              <NavLink to="5">User-5</NavLink>
            </li>
          </ul>

          <hr />

          <NavLink to="new">
            <button style={{ marginTop: 20 }}>➕ New user</button>
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
