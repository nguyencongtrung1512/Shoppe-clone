import classNames from 'classnames'
import { QueryConfig } from '../../pages/ProductLists/ProductList'
import { createSearchParams, Link } from 'react-router-dom'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

/*
* Với range = 2 áp dụng chho khoảng cách dấu, cuối cùng và xung quanh curent_page

[1] 2 3 ... 19 20
1 [2] 3 4 ... 19 20                 TH1: current_page = 1 RANGE = 2, 2 số kế sau là pageNumber> page + Range , 19 20 pageNumber < pageSize - range + 1
1 2 [3] 4 5 ... 19 20                                                 thì hiện dấu ...
1 2 3 [4] 5 6 ... 19 20
1 2 3 4 [5] 6 7 ... 19 20

                                                TH2        page > RANGE * 2 + 1 && page < pageSize - RANGE * 2
1 2 ... 4 5 [6] 7 8 ... 19 20                ... dấu 3 chấm before, pageNumber < page - RANGE && pageNumber >  range
1 2 ... 13 14 [15] 16 17 ... 19 20            dấu 3 chấm after,pageNumber >page + Range && pageNumber < pageSize - RANGE + 1 ...


1 2 ... 14 15 [16] 17 18 19 20             TH3: current_page = 16 RANGE = 2, page > pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE 
1 2 ... 15 16 [17] 18 19 20                                                       hiện 17 18 19 20                                    hiện 14 15
1 2 ... 16 17 [18] 19 20                                                                                                                                          
1 2 ... 17 18 [19] 20
1 2 ... 18 19 [20]
*/

const RANGE = 2
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const rederPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span
            key={index}
            className='bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center'
          >
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span
            key={index}
            className='bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center'
          >
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // điều kiện để return về dấu ...
        //TH1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        }
        //TH2
        else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        }
        //TH3
        else if (page > pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                page: String(pageNumber)
              }).toString()
            }}
            key={index}
            className={classNames(
              'bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center',
              {
                'boder-orange-500 text-orange-500': page === pageNumber,
                'boder-gray-300': page !== pageNumber
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div>
      <div className='flex flex-warp mt-6 justify-center'>
        {page === 1 ? (
          <span className='bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center cursor-not-allowed'>
            Prev
          </span>
        ) : (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                page: String(page-1)
              }).toString()
            }}
            className='bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center '
          >
            Prev
          </Link>
        )}
        {rederPagination()}
        {page === pageSize ? (
          <span className='bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center cursor-not-allowed'>
            Next
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
            className='bg-white border border-gray-300 py-2 px-4 first:rounded-l-md last:rounded-r-md hover:bg-gray-100 items-center shadow-sm justify-center'
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
