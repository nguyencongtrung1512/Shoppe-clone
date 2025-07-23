/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classnameError?: string
}
function InputV2(props: UseControllerProps<any> & InputNumberProps) {
  const {
    type,
    className,
    classNameInput = 'w-full p-3 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm',
    classnameError = 'mt-1 ml-2 text-red-600 min-h[1.25rem] text-sm',
    onChange,
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFromInput) || valueFromInput === '')
    if (numberCondition || type === 'text') {
      // cập nhập localValue State
      setLocalValue(valueFromInput)
      // Gọi field .onChange để cập nhập state React Hook Form
      field.onChange(event)
      //thực thi onChang Callback từ bên ngoài truyền vào props
      onChange && onChange(event)
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classnameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
