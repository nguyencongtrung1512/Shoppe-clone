import { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classnameError?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    className,
    errorMessage,
    classNameInput = 'w-full p-3 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm',
    classnameError = 'mt-1 ml-2 text-red-600 min-h[1.25rem] text-sm',
    onChange,
    ...rest
  },
  ref
) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || (value === '' && onChange)) {
      onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} onChange={handleChange} {...rest} ref={ref} />
      <div className={classnameError}>{errorMessage}</div>
    </div>
  )
})
export default InputNumber