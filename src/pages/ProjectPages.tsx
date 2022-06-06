import { ReactElement } from 'react';
import { useQuery } from 'react-query';
import CreateProjectCard from '../components/CreateProjectCard';
import ProjectCard from '../components/ProjectCard';
import UserMenu from '../components/UserMenu';
import { fetchProjects } from '../querys/ProjectQuerys';
import Cookies from '../services/cookies';
import { Project } from '../types/projects';

export default function ProjectsPage():ReactElement {
  const name = Cookies.get('username');
  // const token = Cookies.get('token');
  // const querClient = useQueryClient();

  const projects = useQuery<Project[]>('projects', fetchProjects);

  return (
    <>
      <header className="flex flex-wrap w-full min-h-[3rem] h-fit items-center justify-between px-5 text-zinc-50 bg-teal-600">
        <p>
          EDirectinsure TODO list
        </p>
        <UserMenu name={name} />
      </header>
      <main className="flex w-full flex-wrap flex-1 gap-5 bg-zinc-200 px-5 pt-5">
        {projects?.data?.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.name}
            id={project.id}
          />
        ))}
        <CreateProjectCard />

      </main>
    </>

  );
}
