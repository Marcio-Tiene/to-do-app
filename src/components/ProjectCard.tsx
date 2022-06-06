/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ReactElement, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdClose, MdDone, MdEdit } from 'react-icons/md';
import { useQuery, useQueryClient } from 'react-query';
import { deletProject, updateProject } from '../querys/ProjectQueries';
import { fetchProjectTasks, postTask } from '../querys/TasksQueries';
import Cookies from '../services/cookies';
import { sortByCreation, sortByLastChange } from '../services/sorter';
import { ITask } from '../types/task';
import { OutsideClick } from './OutsiedClick';
import TaskInput from './TaskInput';
import TextInput from './TextInput';

interface IProjectCardProps{
  name:string,
  id:string,
}

export default function ProjectCard({ id, name }:IProjectCardProps): ReactElement {
  const token = Cookies.get('token');
  const querClient = useQueryClient();
  const queryName = `tasks-${id}`;
  const fetchquery = async () => fetchProjectTasks(id);
  const tasks = useQuery<ITask[]>(queryName, fetchquery, { enabled: !!token });

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(name);
  const [taskToAdd, setTaskToAdd] = useState('');
  return (
    <article className="rounded-xl bg-zinc-100 flex flex-col w-[350px] max-w-full h-[400px] max-h-full shadow-elevation">

      <div className="inline-flex gap-1 justify-between items-center text-zinc-50 bg-teal-600 px-2 py-1 min-h-[2rem]">
        {!isEditing ? (
          <>
            <h2 title={name} className="text-lg font-bold truncate">{name}</h2>
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
            <OutsideClick
              className="inline-flex items-center  gap-2 w-full"
              callback={() => {
                setIsEditing(false);
                setEditedTitle(name);
              }}
            >
              <TextInput name={name} value={editedTitle} onChange={(e) => { setEditedTitle(e.target.value); }} inputClassName="w-full gap-1 py-0 leading-7" wrapperClassname="flex-1" />
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
                <MdClose
                  className="cursor-pointer transition-colors duration-300 leading-none  hover:text-teal-300"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(name);
                  }}
                />

              </span>
            </OutsideClick>
          )}
      </div>

      <div className="flex-1 flex flex-col overflow-auto px-2 pt-2 ">
        {tasks?.data?.some((task) => !task.done) && <h2>To Do</h2>}
        {tasks?.data?.sort(sortByCreation).filter((task) => !task.done).map((task) => (
          <TaskInput
            id={task.id}
            name={task.name}
            done={task.done}
            key={task.id}
            updatedAt={task.updatedAt}
            queryName={queryName}

          />
        ))}
        {tasks?.data?.some((task) => task.done) && <h2>Done</h2>}
        {tasks?.data?.filter((task) => task.done).sort(sortByLastChange).map((task) => (
          <TaskInput
            id={task.id}
            name={task.name}
            done={task.done}
            key={task.id}
            updatedAt={task.updatedAt}

          />
        ))}
      </div>
      <hr className="w-[95%] bg-teal-600 h-[2px] mx-auto" />

      <div className="min-h-10 flex items-center justify-center p-2 gap-1 flex-wrap">
        <TextInput name={`add-task-${name}`} inputClassName="py-1 leading-none w-100%" wrapperClassname="max-w-[80%]" value={taskToAdd} onChange={(e) => { setTaskToAdd(e.target.value); }} />
        <button
          type="button"
          className="rounded-lg  bg-teal-600 font-bold text-zinc-50 px-4 py-[0.05rem]"
          onClick={() => {
            postTask({ title: taskToAdd, projectId: id }).then(() => {
              querClient.invalidateQueries(queryName);
              setTaskToAdd('');
            });
          }}
        >
          add
        </button>
      </div>

    </article>

  );
}
