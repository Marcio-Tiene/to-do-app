/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdClose, MdDone, MdEdit } from 'react-icons/md';
import { useQueryClient } from 'react-query';
import { deleteTask, updatetask } from '../querys/TasksQueries';
import { OutsideClick } from './OutsiedClick';
import TextInput from './TextInput';

/* eslint-disable jsx-a11y/click-events-have-key-events */
interface ITaksInputProps{
  id:string
  queryName?:string
  name:string
  done: boolean
  updatedAt:string
}
export default function TaskInput({
  id, name, done,
  updatedAt, queryName = '',
}:ITaksInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(name);
  const title = done ? `completed on ${new Date(updatedAt).toLocaleString()}` : '';
  const queryClient = useQueryClient();
  return (
    <div title={title} className="max-w-full flex trucate items-center gap-1 pl-2">
      <input
        className=" rounded-[4px] text-teal-600"
        type="checkbox"
        name={name}
        id={id}
        defaultChecked={done}
        disabled={done}
        onClick={() => {
          if (!done) {
            updatetask(id, { done: !done }).then(() => {
              queryClient.invalidateQueries(queryName);
            });
          }
        }}
      />

      {!isEditing ? (
        <>
          <span title={name} className="truncate">{name}</span>
          {!done
          && (
          <span className="inline-flex gap-1">
            <MdEdit className="min-w-[16px] text-teal-600 text-teal-600cursor-pointer transition-colors duration-300  hover:text-teal-300" onClick={() => { setIsEditing(true); }} />

            <FaTrash
              className=" min-w-[16px] text-teal-600 cursor-pointer transition-colors duration-300 hover:text-teal-300"
              onClick={() => {
                if (!done) {
                  deleteTask(id).then(() => {
                    queryClient.invalidateQueries(queryName);
                  });
                }
              }}
            />

          </span>
          )}
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
            <TextInput name={name} value={editedTitle} onChange={(e) => { setEditedTitle(e.target.value); }} inputClassName="w-full gap-1 py-0 leading-0" wrapperClassname="flex-1 " />
            <span className="inline-flex gap-1">
              <MdDone
                className="cursor-pointer text-teal-600 transition-colors duration-300 hover:text-teal-300"
                onClick={() => {
                  if (editedTitle.trim() !== name) {
                    updatetask(id, { name: editedTitle.trim() }).then(() => {
                      queryClient.invalidateQueries(queryName);
                      setIsEditing(false);
                    });
                  }
                }}
              />
              <MdClose
                className="cursor-pointer text-teal-600 transition-colors duration-300 leading-none  hover:text-teal-300"
                onClick={() => {
                  setIsEditing(false);
                  setEditedTitle(name);
                }}
              />

            </span>
          </OutsideClick>
        )}

    </div>
  );
}
