import { createBrowserRouter } from 'react-router-dom';

// import ProtectedLayout from '@/routes/protected/layout';

export const router = createBrowserRouter([
  //public
  {
    path: '/login',
    lazy: () => import('../routes/public/login'),
  },
  //protected
  //   {
  //     path: '/',
  //     element: <ProtectedLayout />,
  //     HydrateFallback: () => <div style={{ padding: 24 }}>Loading…</div>,
  //     // lazy: () => import('../routes/protected/layout'),
  //     children: [
  //       { index: true, loader: () => redirect('/dashboard') },
  //       {
  //         path: 'dashboard',
  //         lazy: () => import('../routes/protected/dashboard'),
  //       },
  //     ],
  //   },

  {
    basename: import.meta.env.BASE_URL,
  },
]);
