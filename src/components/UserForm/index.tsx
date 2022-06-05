import {
  FormEventHandler, ReactElement, useCallback, useState,
} from 'react';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Cookies from '../../services/cookies';

interface IUserFormProps {
  type: 'login'| 'register'
}

export default function UserForm({ type }: IUserFormProps): ReactElement {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const buttonLabel = type === 'login' ? 'sign in' : 'sign up';

  const navigate = useNavigate();

  const onsSubmit: FormEventHandler = useCallback(async (event) => {
    event.preventDefault();
    setIsloading(true);
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
            className: 'bg-red-500',
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
    setIsloading(false);
  }, []);

  return (
    <form
      onSubmit={onsSubmit}
      className="flex flex-col gap-5 items-center"
    >

      <label
        htmlFor="name"
        className="flex flex-col gap-1 text-zinc-700 font-bold"
      >
        username:
        <input
          id="name"
          type="text"
          name="name"
          placeholder="ex: JohnDoe"
          className="rounded-lg  text-zinc-700 font-normal transition-all duration-300 focus:ring-teal-600 focus:border-teal-600"
          disabled={isLoading}
        />
      </label>

      <label htmlFor="password" className="flex flex-col gap-1 text-zinc-700 font-bold">
        password:
        <div className="relative">
          <input id="password" type={showPassword ? 'text' : 'password'} name="password" className="rounded-lg text-zinc-700 font-normal transition-all duration-300 focus:ring-teal-600 focus:border-teal-600" disabled={isLoading} />
          {showPassword
            ? (
              <AiOutlineUnlock
                onClick={() => {
                  if (!isLoading) setShowPassword((prevState) => !prevState);
                }}
                className="absolute transition-transform duration-300 cursor-pointer right-2 top-[0.9rem] text-teal-600 hover:scale-105"
              />
            )
            : (
              <AiOutlineLock
                onClick={() => {
                  if (!isLoading) setShowPassword((prevState) => !prevState);
                }}
                className="absolute cursor-pointer right-2 top-[0.9rem] text-teal-600 transition-transform duration-300 hover:scale-105"
              />
            )}
        </div>

      </label>

      <input type="submit" value={buttonLabel} className="bg-teal-600 font-bold text-white px-4 py-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105  " />

    </form>
  );
}
