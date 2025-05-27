import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../../types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import path from '../../../../constants/path'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='bg-white shadow rounded-sm hover:shadow-md hover:translate-y-[-2px] duration-100 transition-transform'>
        <div className=' w-full pt-[100%] relative'>
          <img
            src={product.image}
            className='absolute top-0 left-0 w-full h-full object-cover bg-white'
            alt={product.name}
          />
        </div>
        {/* <div className='absolute z-1 bottom-0 top-0 left-0 '>
          <img
            src='https://down-vn.img.susercontent.com/file/vn-11134258-7ras8-m36nyzteqmzw43'
            className='w-full'
            alt='custom-overlay'
          />
        </div> */}
        <div className='p-2 oveflow-hidden'>
          <div className='min-h-[1.75rem] line-clamp-2 text-sm'>⚡️ Giá Sốc ⚡️{product.name}</div>

          <div className='flex item-center mt-3'>
            <div className='line-through max-w-[50%] text-gray-500 text-sm truncate'>
              ₫{formatCurrency(product.price_before_discount)}
            </div>
            <div className='text-orange-500 ml-1 truncate'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <div className='flex items-center'>
              <div className='relative'>
                <div className='absolute top-0 left-0 h-full opacity-50 overflow-hidden' style={{ width: '50%' }}>
                  <img
                    className='mt-1 w-3 h-3 fill-yellow-300 text-yellow-300'
                    src='https://deo.shopeemobile.com/shopee/modules-federation/live/0/shopee__item-card-standard-v2/0.1.39/pc/d7099d3fd1dfdaf705ab.svg'
                    width='10'
                    height='10'
                    alt='rating-star-full'
                  />
                </div>
                <div className='flex ml-2 text-sm'>
                  <span className='px-2 text-sm'>{product.rating}</span>
                  <div className='truncate text-sm min-h-4'>Đã bán {formatNumberToSocialStyle(product.sold)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
