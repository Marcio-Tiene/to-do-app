import { ChangeEvent } from 'react';

interface ITextInputProps{
  disabled?: boolean
  label?: string
  name:string
  placeholder?:string
  inputClassName?: string
  wrapperClassname?:string
  value?:string
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  defaultValue?:string

}

export default function TextInput({
  disabled = false, name, label, placeholder, inputClassName = '', wrapperClassname = '', onChange, value, defaultValue,
}:ITextInputProps) {
  return (
    <label
      title="Done on $"
      htmlFor={name}
      className={`flex flex-col gap-1 text-zinc-700 font-bold ${wrapperClassname}`}
    >
      {!!label && <span className="truncate">{label}</span>}

      <input
        id={name}
        type="text"
        name={name}
        autoComplete={label ?? name}
        placeholder={placeholder}
        className={` max-w-[100%] rounded-lg  text-zinc-700 font-normal transition-all duration-300 focus:ring-teal-600 focus:border-teal-600 ${inputClassName}`}
        disabled={disabled}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      />
    </label>
  );
}
