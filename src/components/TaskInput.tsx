/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { FaTrash } from 'react-icons/fa';

/* eslint-disable jsx-a11y/click-events-have-key-events */
interface ITaksInputProps{
  id:string
  onClick?:()=> void
  onDeletClick?:()=>void
  name:string
  done: boolean
  updatedAt:string
}
export default function TaskInput({
  id, name, done, onClick = () => {}, onDeletClick = () => {}, updatedAt,
}:ITaksInputProps) {
  const title = done ? `completed on ${new Date(updatedAt).toLocaleString()}` : '';
  return (
    <div title={title} className="max-w-full flex trucate items-center gap-1 pl-2">
      <label
        htmlFor={id}
        className="flex items-center gap-1 truncate"
        onClick={() => {
          if (!done) {
            onClick();
          }
        }}
      >
        <input className=" rounded-[4px] text-teal-600" type="checkbox" name={name} id={id} defaultChecked={done} />
        <span title={name} className="max-w-full truncate">{name}</span>
      </label>
      {!done && (
      <FaTrash
        className="min-w-[16px] text-teal-600 cursor-pointer transition-colors duration-300 hover:text-teal-300"
        onClick={onDeletClick}
      />
      )}
    </div>
  );
}
