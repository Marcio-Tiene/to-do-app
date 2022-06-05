interface ITextInputProps{
  disabled?: boolean
  label?: string
  name:string
  placeholder?:string
  inputClassName?: string
  wrapperClassname?:string
}

export default function TextInput({
  disabled = false, name, label, placeholder, inputClassName = '', wrapperClassname = '',
}:ITextInputProps) {
  return (
    <label
      htmlFor={name}
      className={`flex flex-col gap-1 text-zinc-700 font-bold ${wrapperClassname}`}
    >
      {label}
      <input
        id={name}
        type="text"
        name={name}
        autoComplete={label ?? name}
        placeholder={placeholder}
        className={`rounded-lg  text-zinc-700 font-normal transition-all duration-300 focus:ring-teal-600 focus:border-teal-600 ${inputClassName}`}
        disabled={disabled}
      />
    </label>
  );
}
