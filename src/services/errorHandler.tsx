/* eslint-disable import/prefer-default-export */
import toast from 'react-hot-toast';

export const generalErrorHandler = (errors: Record<any, any>) => {
  Object.keys(errors).forEach((error) => {
    toast.error(errors[error], {
      id: error,
      className: 'bg-red-500 text-zinc-50',
      iconTheme: {
        primary: '#fff',
        secondary: '#ff0000',
      },
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  });
};
