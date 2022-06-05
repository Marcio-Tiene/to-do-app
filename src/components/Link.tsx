import { ReactElement, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface IlinkProps{
  children?: ReactNode
  to: string
}

export default function Link({ to, children }: IlinkProps): ReactElement {
  return (
    <RouterLink
      to={to}
      className="font-bold
         transition-all duration-300 text-teal-600 hover:underline underline-offset-1"
    >
      {children}

    </RouterLink>
  );
}
