import { ReactElement, useState } from 'react';
import useUserFormHandler from '../hooks/useUserFormHandler';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';

interface IUserFormProps {
  type: 'login'| 'register'
}

export default function UserForm({ type }: IUserFormProps): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const buttonLabel = type === 'login' ? 'sign in' : 'sign up';
  const onSubmit = useUserFormHandler({ type, setIsLoading });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 items-center"
    >
      <TextInput name="name" disabled={isLoading} placeholder="ex: JohnDoe" label="username:" />
      <PasswordInput label="password" disabled={isLoading} />

      <input type="submit" value={buttonLabel} className="bg-teal-600 font-bold text-white px-4 py-2 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105  " />

    </form>
  );
}
