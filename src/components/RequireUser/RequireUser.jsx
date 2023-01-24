import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

function RequireUser() {
  // Hooks
  const email = useSelector((state) => state.user.email);

  // useEffect
  useEffect(() => {
    if (!email || !email.length) {
      throw new Response('', { status: 401 });
    }
  });

  return (
    <>
      <Outlet />
    </>
  );
}

export default RequireUser;
