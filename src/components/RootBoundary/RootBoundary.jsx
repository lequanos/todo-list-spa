import { useRouteError } from 'react-router-dom';
import Unauthorized from '../Unauthorized/Unauthorized';
import NotFound from '../NotFound/NotFound';

function RootBoundary() {
  const error = useRouteError();

  if (error.status === 404) {
    return <NotFound />;
  }

  if (error.status === 401) {
    return <Unauthorized />;
  }

  return <div>Something went wrong</div>;
}

export default RootBoundary;
