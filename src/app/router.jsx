import { createBrowserRouter, redirect } from 'react-router-dom';

// import ProtectedLayout from '@/routes/protected/layout';

export const router = createBrowserRouter(
  [
    //-------------------public
    {
      path: '/login',
      lazy: () => import('../routes/public/login'),
    },
    //------------------protected
    {
      id: 'protected',
      path: '/',
      lazy: () => import('../routes/protected/layout'),
      children: [
        { index: true, loader: () => redirect('/dashboard') },
        {
          id: 'dashboard',
          path: 'dashboard',
          lazy: () => import('../routes/protected/dashboard'),
        },
        {
          id: 'users',
          path: 'users',
          lazy: () => import('../routes/protected/users/layout'),
          children: [
            { index: true, lazy: () => import('../routes/protected/users/index') },
            {
              path: 'new',
              lazy: () => import('../routes/protected/users/new'),
            },
            {
              id: 'userDetails',
              path: ':userId',
              lazy: () => import('../routes/protected/users/details'),
            },
            {
              path: ':userId/edit',
              lazy: () => import('../routes/protected/users/edit'),
            },
          ],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
