import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from '../../../../component/Button'
import { Category } from '../../../../types/Category.type'
import classNames from 'classnames'
import InputNumber from '../../../../component/inputNumber'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../../../utils/rules'
import RatingStars from '../RatingStars'
import { omit } from 'lodash'
import { QueryConfig } from '../../../../hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

type FormData = {
  price_min: string
  price_max: string
}
/**
 * 
 Rule validate
 Nếu có price_min price_max thì price_max phải lớn hơn price_min
 còn ko có price_min thì ko có price_max
 */

const priceSchema = schema.pick(['price_min', 'price_max']).required()

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(priceSchema as any),
    shouldFocusError: false
  })
  const navigate = useNavigate()
  const valueForm = watch()
  console.log(valueForm)
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min
      }).toString()
    })
  })

  const handleRemoveAll = () => {
    navigate({
      pathname: '/',
      search: createSearchParams(omit(queryConfig, ['price_max', 'price_min', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link
        to={'/'}
        className={classNames('flex px-4 pd-2 items-center font-bold', {
          'text-orange-500': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='w-3 h-4 fill-current'>
          <g fill-rule='evenodd' stroke='none' stroke-width='1'>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <div className='ml-2'>Tất Cả Danh Mục</div>
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <ul>
        {categories.map((categoryItem) => {
          const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2'>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('flex relative px-2', {
                  'text-orange-500 font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='w-2 h-2 fill-current text-orange-600 mt-2 mr-1'>
                    <polygon points='4 3.5 0 0 0 7'></polygon>
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to='/' className='flex px-4 pd-2 items-center font-bold uppercase'>
        <svg
          enable-background='new 0 0 15 15'
          viewBox='0 0 15 15'
          x='0'
          y='0'
          className='w-3 h-4 fill-current stroke-current mr-3'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-miterlimit='10'
            ></polyline>
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='my-5'>
        <div>khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex item-start'>
            <Controller
              control={control}
              name='price_min'
              render={({ field }) => {
                return (
                  <InputNumber
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    type='text'
                    className='grow'
                    classnameError='hidden'
                    placeholder='đ TỪ'
                    classNameInput='w-full p-1 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                    ref={field.ref}
                  />
                )
              }}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              control={control}
              name='price_max'
              render={({ field }) => {
                return (
                  <InputNumber
                    onChange={(event) => {
                      field.onChange(event)
                      trigger('price_max')
                    }}
                    value={field.value}
                    type='text'
                    classnameError='hidden'
                    className='grow'
                    placeholder='đ ĐẾN'
                    classNameInput='w-full p-1 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
                  />
                )
              }}
            />
          </div>
          <div className='mt-1 ml-2 text-red-600 min-h[1.25rem] text-sm text-red text-center'>
            {errors.price_max?.message}
          </div>
          <Button
            className='w-full p-2 uppercase bg-orange-500 hover:bg-orange-600 text-white
           mt-3 flex justify-center items-center'
          >
            Áp Dụng
          </Button>
        </form>
      </div>
      <div className='bg-gray-300 h-[1px] my-4' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button
        className='flex items-center justify-center w-full py-2 px-2 text-white bg-orange-500 uppercase'
        onClick={handleRemoveAll}
      >
        Xóa Tất cả
      </Button>
    </div>
  )
}
