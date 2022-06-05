import React, { FormEventHandler, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from '../services/cookies';

interface IUseUserFormHandlerProps {
  type: 'login' | 'register'
  // eslint-disable-next-line no-unused-vars
  setIsLoading : (value: React.SetStateAction<boolean>) => void
}

export default function useUserFormHandler({ type, setIsLoading }: IUseUserFormHandlerProps) {
  const navigate = useNavigate();
  const onSubmit: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const data :Record<any, any> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const response = await fetch(`${import.meta.env.VITE_API_URL}/${type}`, {
      method: 'POST',
      body: JSON.stringify(data),
      mode: 'cors',

      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',

      },
    });

    if (response.ok) {
      const { token } = await response.json();
      Cookies.setAuth(token);
      navigate('/');
    }

    if (!response.ok) {
      const err = await response.json();
      const { errors } = err;
      if (errors) {
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
      }
    }
    setIsLoading(false);
  }, []);
  return onSubmit;
}
