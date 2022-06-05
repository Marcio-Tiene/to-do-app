/* eslint-disable react/jsx-no-useless-fragment */

import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from '../services/cookies';

export default function ProtectRoute(
  { children }: {children: ReactElement},
): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  });

  return (
    <>
      {children}
    </>

  );
}
