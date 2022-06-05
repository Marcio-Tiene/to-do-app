import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../components/Link';
import UserForm from '../components/UserForm';
import Cookies from '../services/cookies';

export default function LoginPage(): ReactElement {
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login');
    }
  });

  return (
    <main className="flex w-full h-[100vh] items-center justify-center bg-zinc-200">

      <section className="p-10 rounded-3xl shadow-neumorph flex flex-col gap-5 items-center bg-zinc-50">
        <h1 className="font-extrabold text-emerald-600 text-3xl">Login!</h1>
        <UserForm type="login" />
        <Link to="/Register">
          I want to sign up!
        </Link>

      </section>

    </main>
  );
}
