import { Outlet } from 'react-router-dom';

export default function ProtectedLayout() {
  return (
    <>
      <header>Header</header>
      <nav>Nav</nav>

      <Outlet />
    </>
  );
}
