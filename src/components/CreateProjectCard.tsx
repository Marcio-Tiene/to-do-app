import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { postProject } from '../querys/ProjectQuerys';
import TextInput from './TextInput';

export default function CreateProjectCard() {
  const [title, setTitle] = useState('');
  const querClient = useQueryClient();
  return (
    <article className="rounded-xl bg-zinc-200 gap-5 flex flex-col items-center justify-center w-[350px] max-w-full h-[250px] max-h-full shadow-elevation">

      <TextInput name="create-project" label="Create a new project" wrapperClassname="text-2xl text-center" placeholder="Project Name" inputClassName="text-left mt-1" value={title} onChange={(e) => { setTitle(e.target.value); }} />
      <button
        className="text-center rounded-lg w-[280px] max-w-[95%] transition-all duration-700 hover:scale-105 text-zinc-50 bg-teal-600 px-5 py-2"
        type="button"
        onClick={() => {
          postProject({ title }).then(() => {
            querClient.invalidateQueries('projects');
            setTitle('');
          }).catch();
        }}
      >
        Create Project
      </button>
    </article>

  );
}
