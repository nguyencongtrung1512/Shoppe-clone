import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
  classNameInput?: string
  classnameError?: string
}
export default function Input({
  name,
  register,
  rules,
  className,
  errorMessage,
  classNameInput = 'w-full p-3 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm',
  classnameError = 'mt-1 ml-2 text-red-600 min-h[1.25rem] text-sm',
  ...rest
}: Props) {
  const registerResult = register && typeof register && name ? register(name, rules) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classnameError}>{errorMessage}</div>
    </div>
  )
}
