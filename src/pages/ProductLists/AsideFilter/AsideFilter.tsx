import { createSearchParams, Link } from 'react-router-dom'
import Input from '../../../component/Input'
import Button from '../../../component/Button'
import { QueryConfig } from '../ProductList'
import { Category } from '../../../types/Category.type'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  console.log(category, categories)
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
                className={classNames('relative px-2', {
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
        <form className='mt-2'>
          <div className='flex item-start'>
            <Input
              type='text'
              className='grow'
              placeholder='đ TỪ'
              name='from'
              classNameInput='w-full p-1 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Input
              type='text'
              className='grow'
              placeholder='đ ĐẾN'
              name='from'
              classNameInput='w-full p-1 border border-gray-300 focus:border-gray-500 focus:shadow-sm rounded-sm'
            />
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
      <ul className='my-3'>
        <li className='py-1 pl-2'>
          <Link to='/' className='flex items-center px-2 py-2 text-sm'>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 fill-current mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset='0' stop-color='#ffca11'></stop>
                      <stop offset='1' stop-color='#ffad27'></stop>
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    ></polygon>
                  </defs>
                  <g fill='url(#ratingStarGradient)' fill-rule='evenodd' stroke='none' stroke-width='1'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' stroke-width='.5' xlinkHref='#ratingStar'></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}{' '}
            <span>Trở lên</span>
          </Link>
        </li>
        <li className='py-1 pl-2'>
          <Link to='/' className='flex items-center px-2 py-2 text-sm'>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <svg viewBox='0 0 9.5 8' className='w-4 h-4 fill-current mr-1' key={index}>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset='0' stop-color='#ffca11'></stop>
                      <stop offset='1' stop-color='#ffad27'></stop>
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    ></polygon>
                  </defs>
                  <g fill='url(#ratingStarGradient)' fill-rule='evenodd' stroke='none' stroke-width='1'>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' stroke-width='.5' xlinkHref='#ratingStar'></use>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              ))}{' '}
            <span>Trở lên</span>
          </Link>
        </li>
      </ul>
      <div className='bg-gray-300 h-[1px] my-4' />
      <Button className='flex items-center justify-center w-full py-2 px-2 text-white bg-orange-500 uppercase'>
        Xóa Tất cả
      </Button>
    </div>
  )
}
