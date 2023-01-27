import { useRouteError } from 'react-router-dom';
import Unauthorized from '@/views/Unauthorized/Unauthorized';
import NotFound from '@/views/NotFound/NotFound';
import InternalServerError from '@/views/InternalServerError/InternalServerError';

function RootBoundary() {
  const error = useRouteError();

  if (error.status === 404) {
    return <NotFound />;
  }

  if (error.status === 401) {
    return <Unauthorized />;
  }

  return <InternalServerError />;
}

export default RootBoundary;
