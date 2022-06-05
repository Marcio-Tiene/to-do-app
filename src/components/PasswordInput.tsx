import { useState } from 'react';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

interface IPasswordInputProps {
  disabled?:boolean
  label?:string
  inputClassName?: string
  wrapperClassname?:string
  iconClassName?:string
}

export default function PasswordInput({
  disabled = false, label, wrapperClassname = '', inputClassName = '', iconClassName = '',
}: IPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const icoStyles = `absolute transition-transform duration-300 cursor-pointer right-2 top-[0.9rem] text-teal-600 hover:scale-105 ${iconClassName}`;
  return (
    <label htmlFor="password" className={`flex flex-col gap-1 text-zinc-700 font-bold $${wrapperClassname}`}>
      {label}
      <div className="relative">
        <input id="password" autoComplete="current-password" type={showPassword ? 'text' : 'password'} name="password" className={`rounded-lg text-zinc-700 font-normal transition-all duration-300 focus:ring-teal-600 focus:border-teal-600 ${inputClassName}`} disabled={disabled} />
        {showPassword
          ? (
            <AiOutlineUnlock
              onClick={() => {
                if (!disabled) setShowPassword((prevState) => !prevState);
              }}
              className={icoStyles}
            />
          )
          : (
            <AiOutlineLock
              onClick={() => {
                if (!disabled) setShowPassword((prevState) => !prevState);
              }}
              className={icoStyles}
            />
          )}
      </div>

    </label>
  );
}
