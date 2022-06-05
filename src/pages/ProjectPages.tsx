import { ReactElement } from 'react';
import UserMenu from '../components/UserMenu';
import Cookies from '../services/cookies';

export default function ProjectsPage():ReactElement {
  const name = Cookies.get('username');

  return (
    <>
      <header className="flex w-full min-h-[3rem] h-fit items-center justify-between px-5 text-zinc-50 bg-teal-600">
        <p>
          EDirectinsure TODO list
        </p>
        <UserMenu name={name} />
      </header>
      <main className="flex w-full flex-1 items-center justify-center bg-zinc-200">
        <div className="text-3xl">
          Projects Page

        </div>
      </main>
    </>

  );
}
