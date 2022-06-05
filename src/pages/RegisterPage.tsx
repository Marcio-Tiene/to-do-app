import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../components/UserForm';

export default function RegisterPage(): ReactElement {
  return (
    <main className="flex w-full h-[100vh] items-center justify-center bg-zinc-200">
      <section className="p-10 rounded-3xl shadow-neumorph flex flex-col gap-5 items-center bg-zinc-50">
        <h1 className="font-extrabold text-teal-600 text-3xl">EDirectinsure TODO list</h1>
        <UserForm type="register" />
        <Link
          to="/login"
          className="font-bold
         transition-all duration-300 text-teal-600 hover:underline underline-offset-1"
        >
          I have an account
        </Link>
      </section>

    </main>
  );
}
