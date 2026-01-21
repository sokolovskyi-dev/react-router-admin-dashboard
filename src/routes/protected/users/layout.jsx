import { Outlet } from 'react-router-dom';

export function Component() {
  return (
    <>
      <h1>UsersLayout</h1>
      <Outlet />
    </>
  );
}
