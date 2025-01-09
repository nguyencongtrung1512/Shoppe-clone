import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: 'Email is required'
    },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Email is invalid'
    },
    maxLength: {
      value: 160,
      message: 'Email is too long 5 - 160 characters'
    },
    minLength: {
      value: 5,
      message: 'Email is too long 5 - 160 characters'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password is required'
    },
    maxLength: {
      value: 160,
      message: 'Password is too long 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'Password is too long 6 - 160 characters'
    },
    deps: ['email']
  },
  confirm_password: {
    required: {
      value: true,
      message: 'confirm_password is required'
    },
    maxLength: {
      value: 160,
      message: 'confirm_password is too long 6 - 160 characters'
    },
    minLength: {
      value: 6,
      message: 'confirm_password is too long 6 - 160 characters'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Passwords do not match'
        : undefined
  }
})

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_min) < Number(price_max)
  }
  return price_min !== '' || price_max !== ''
}
export const schema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Email is invalid')
    .min(5, 'Email is too long 5 - 160 characters')
    .max(160, 'Email is too long 5 - 160 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too long 6 - 160 characters')
    .max(160, 'Password is too long 6 - 160 characters'),
  confirm_password: yup
    .string()
    .required('Confirm_password is required')
    .min(6, 'Confirm_password is too long 6 - 160 characters')
    .max(160, 'Confirm_password is too long 6 - 160 characters')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price not allowed',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Price not allowed',
    test: testPriceMinMax
  })
})

// const loginSchema = yup.object().shape({
//   email: schema.email,
//   password: schema.password
// })
// export type LoginSchema = yup.InferType<typeof loginSchema>
export const loginSchema = schema.pick(['email', 'password'])

export type LoginSchema = yup.InferType<typeof loginSchema>

export type Schema = yup.InferType<typeof schema>
