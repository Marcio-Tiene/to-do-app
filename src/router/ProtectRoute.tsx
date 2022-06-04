/* eslint-disable react/jsx-no-useless-fragment */

import { ReactElement } from 'react';
import Cookies from '../services/cookies';

export default function ProtectRoute(
  { children }: {children: ReactElement},
): ReactElement {
  const jwt = Cookies.getAll();
  console.log(jwt);
  return (
    <>
      {children}
    </>

  );
}
