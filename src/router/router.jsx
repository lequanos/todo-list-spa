import { createBrowserRouter } from 'react-router-dom';
import Home from '@/views/Home/Home';
import Lists from '@/views/Lists/Lists';
import Unauthorized from '@/components/Unauthorized/Unauthorized';
import NotFound from '@/components/NotFound/NotFound';
import RootBoundary from '../components/RootBoundary/RootBoundary';
import RequireUser from '../components/RequireUser/RequireUser';

const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <RootBoundary />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '',
          element: <RequireUser />,
          children: [
            {
              path: '/lists',
              element: <Lists />,
            },
          ],
        },
        {
          path: '/401',
          element: <Unauthorized />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASENAME,
  },
);

export default router;
