/* eslint-disable react/jsx-no-useless-fragment */

import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from '../services/cookies';

export default function ProtectRoute(
  { children }: {children: ReactElement},
): ReactElement {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <>
      {children}
    </>

  );
}
