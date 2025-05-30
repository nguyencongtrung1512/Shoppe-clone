import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import productApi from '../../apis/product.api'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from '../../utils/utils'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import Product from '../ProductLists/components/Product'
import QuantityController from '../../component/QuantityController'
import purchaseApi from '../../apis/purchase.api'
import { queryClient } from '../../main'
import { PurchasesStatus } from '../../constants/purchase'
import { toast } from 'react-toastify'

function ProductDetail() {
  const { nameId } = useParams()
  const [buyCount, setBuyCount] = useState(1)
  const id = getIdFromNameId(nameId as string)
  //call api
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const addToCartMutation = useMutation({
    mutationFn: (body: { buy_count: number; product_id: string }) => purchaseApi.addToCart(body)
  })
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 5])
  const [activeImages, setActiveImages] = useState('')
  const product = productDetailData?.data.data
  const currentImages = useMemo(
    () => (product ? product?.images.slice(...currentIndexImages) : []),
    [product, currentIndexImages]
  )
  const queryConfig: ProductListConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig)
    },
    staleTime: 1000 * 60 * 3,
    enabled: Boolean(product)
  })

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (product && product?.images.length > 0) {
      setActiveImages(product?.images[0])
    }
  }, [product])

  const choseImages = (img: string) => {
    setActiveImages(img)
  }

  const nextImages = () => {
    if (currentIndexImages[1] < (product as ProductType).images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prevImages = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalWidth, naturalHeight } = image
    // cachs 1: lấy offsetX, offsetY đươn giản khi chúng ta xử lí được bubble event bằng cách thêm pointer-event-none vào class
    //const { offsetX, offsetY } = event.nativeEvent
    //cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý event bubble
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalWidth / rect.width)
    const left = offsetX * (1 - naturalHeight / rect.height)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'

    //event bubble
  }

  const handleRemoveZoom = () => {
    const image = imageRef.current as HTMLImageElement
    image.style.width = '100%'
    image.style.height = '100%'
    image.style.maxWidth = 'unset'
    image.style.top = '0'
    image.style.left = '0'
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const addToCart = () => {
    addToCartMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
          queryClient.invalidateQueries({ queryKey: ['purchase', { status: PurchasesStatus.inCart }] })
        }
      }
    )
  }
  // console.log(product)
  if (!product) return null
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        <div className='mt-8 bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow cursor-zoom-in'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImages}
                  alt={product.name}
                  ref={imageRef}
                  className='absolute top-0 left-0 w-full h-full object-cover bg-white'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prevImages}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path stroke-linecap='round' stroke-linejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImages
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => choseImages(img)}>
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 w-full h-full object-cover bg-white cursor-pointer object-contain'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange-500' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={nextImages}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    stroke='currentColor'
                    className='size-5'
                  >
                    <path stroke-linecap='round' stroke-linejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <span className='mr-1 text-orange-500 underline text-orange-500'>{product.rating}</span>
                <svg viewBox='0 0 9.5 8' className='mr-1 h-4 w-4 ml-1'>
                  <defs>
                    <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                      <stop offset={0} stopColor='#ffca11' />
                      <stop offset={1} stopColor='#ffad27' />
                    </linearGradient>
                    <polygon
                      id='ratingStar'
                      points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                    />
                  </defs>
                  <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                    <g transform='translate(-876 -1270)'>
                      <g transform='translate(155 992)'>
                        <g transform='translate(600 29)'>
                          <g transform='translate(10 239)'>
                            <g transform='translate(101 10)'>
                              <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl text-orange-500'>đ{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange-500 py-1 px-1 text-xs text-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              {/*quantityController */}
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  onChange={() => {}}
                  max={product.quantity}
                  value={buyCount}
                />
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>

              <div className='mt-8 flex items-center'>
                <button onClick={addToCart}>
                  <div className='flex items-center justify-center h-12 rounded-sm border border-orange-500 bg-orange/10 py-1 px-5 text-sm text-orange-500 hover:bg-orange-100'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      className='size-5 mr-2'
                    >
                      <path
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                      />
                    </svg>

                    <span>Thêm vào giỏ hàng</span>
                  </div>
                </button>
                <button className='ml-4 flex items-center justify-center h-12 rounded-sm bg-orange-500 py-1 px-5 text-sm text-white hover:bg-orange-600'>
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='mt-8 bg-white p-4 shadow'>
              <h2 className='text-lg font-medium uppercase rounded text-slate-700'>Mô tả sản phẩm</h2>
              <div className='mt-6 text-sm leading-loose text-gray-600'>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container'>
          <h2 className='text-lg font-medium uppercase rounded text-slate-700'>Có thể bạn không thích</h2>
          {productsData && (
            <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
              {productsData.data.data.products.map((product) => (
                <div key={product._id} className='col-span-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
