import classNames from 'classnames'
import Button from '../../../../component/Button'
import { ProductListConfig } from '../../../../types/product.type'
import { sortBy, order as orderConstant } from '../../../../constants/product'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { omit } from 'lodash'
import { QueryConfig } from '../../../../hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProductList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }
  const handleSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  const handlePriceOrder = (orderValue: Exclude<ProductListConfig['order'], undefined>) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue
      }).toString()
    })
  }
  return (
    <div className='bg-gray-200 py-4 px-3'>
      <div className='flex flex-warp item-center gap-2'>
        <div className='flex items-center flex-warp gap-3 hover:text-slate-100'>Sắp xếp theo</div>
        <Button
          className={classNames('capitalize text-sm text-center h-8 px-4', {
            'bg-orange-500 text-white hover:bg-orange-500/80': isActiveSortBy(sortBy.view),
            'bg-white text-black hover:text-slate-100': !isActiveSortBy(sortBy.view)
          })}
          onClick={() => handleSortBy(sortBy.view)}
        >
          Phổ Biến
        </Button>
        <Button
          className={classNames('capitalize text-sm text-center h-8 px-4', {
            'bg-orange-500 text-white hover:bg-orange-500/80': isActiveSortBy(sortBy.createdAt),
            'bg-white text-black hover:text-slate-100': !isActiveSortBy(sortBy.createdAt)
          })}
          onClick={() => handleSortBy(sortBy.createdAt)}
        >
          Mới Nhất
        </Button>
        <Button
          className={classNames('capitalize text-sm text-center h-8 px-4', {
            'bg-orange-500 text-white hover:bg-orange-500/80': isActiveSortBy(sortBy.sold),
            'bg-white text-black hover:text-slate-100': !isActiveSortBy(sortBy.sold)
          })}
          onClick={() => handleSortBy(sortBy.sold)}
        >
          Bán Chạy
        </Button>
        <select
          className={classNames('capitalize  text-sm text-left h-8 px-4', {
            'bg-orange-500 text-white hover:bg-orange-500/80': isActiveSortBy(sortBy.price),
            'bg-white text-black hover:text-slate-100': !isActiveSortBy(sortBy.price)
          })}
          value={order || ''}
          onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
        >
          <option className='text-black bg-white' defaultValue='' disabled>
            Giá
          </option>
          <option className='text-black bg-white' value={orderConstant.asc}>
            Giá: Thấp đến cao
          </option>
          <option className='text-black bg-white' value={orderConstant.desc}>
            Giá: Cao đến thấp
          </option>
        </select>
        <div className='flex flex-warp gap-2 ml-20 items-center '>
          <div>
            <span className='text-orange-600'>{page}</span>
            <span>/{pageSize}</span>
          </div>
          <div className='ml-2 flex'>
            {page === 1 ? (
              <span className='flex items-center px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    page: String(page - 1)
                  }).toString()
                }}
                className='flex items-center px-3 h-8 rounded-tl-sm
               rounded-bl-sm bg-white/60 hover:bg-slate-100 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )}

            {page === pageSize ? (
              <span className='flex items-center px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    ...queryConfig,
                    page: String(page + 1)
                  }).toString()
                }}
                className='flex items-center px-3 h-8 rounded-tl-sm
               rounded-bl-sm bg-white/60 hover:bg-slate-100 '
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke-width='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
