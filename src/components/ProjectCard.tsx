import { ReactElement, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdClose, MdDone, MdEdit } from 'react-icons/md';
import { useQueryClient } from 'react-query';
import { deletProject, updateProject } from '../querys/ProjectQuerys';
import { OutsideClick } from './OutsiedClick';
import TextInput from './TextInput';

interface IProjectCardProps{
  name:string,
  id:string,
}

export default function ProjectCard({ id, name }:IProjectCardProps): ReactElement {
  const querClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(name);
  return (
    <article className="rounded-xl bg-zinc-100 flex flex-col w-[350px] max-w-full h-[500px] max-h-full shadow-elevation">

      <div className="inline-flex gap-1 justify-between items-center text-zinc-50 bg-teal-600 px-2 py-1 min-h-[2rem]">
        {!isEditing ? (
          <>
            <h2 title={name} className="truncate">{name}</h2>
            <span className="inline-flex gap-1">
              <MdEdit className="cursor-pointer transition-colors duration-300  hover:text-teal-300" onClick={() => { setIsEditing(true); }} />
              <FaTrash
                className="cursor-pointer transition-colors duration-300 hover:text-teal-300"
                onClick={() => {
                  deletProject(id).then(() => { querClient.invalidateQueries('projects'); });
                }}
              />

            </span>
          </>
        )
          : (
            <OutsideClick className="inline-flex items-center  w-full" callback={() => { setIsEditing(false); }}>
              <TextInput name={name} value={editedTitle} onChange={(e) => { setEditedTitle(e.target.value); }} inputClassName="w-60 py-0 leading-none" wrapperClassname="flex-1" />
              <span className="inline-flex gap-1">
                <MdDone
                  className="cursor-pointer transition-colors duration-300 hover:text-teal-300"
                  onClick={() => {
                    if (editedTitle.trim() !== name) {
                      updateProject(id, editedTitle).then(() => {
                        querClient.invalidateQueries('projects');
                        setIsEditing(false);
                      });
                    }
                  }}
                />
                <MdClose className="cursor-pointer transition-colors duration-300 leading-none  hover:text-teal-300" onClick={() => { setIsEditing(false); }} />

              </span>
            </OutsideClick>
          )}

      </div>

      <div className="flex-1 overflow-auto px-2 pt-1">
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj

        lkasjdsakljdsakdlj

        lkasjdsakljdsakdlj

        v
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj

        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        lkasjdsakljdsakdlj
        v
      </div>
      <h2 title={name} className="truncate">{name}</h2>

    </article>

  );
}
