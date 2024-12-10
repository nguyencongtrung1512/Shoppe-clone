import Button from '../../../component/Button'

export default function SortProductList() {
  return (
    <div className='bg-gray-200 py-4 px-3'>
      <div className='flex flex-warp item-center gap-2'>
        <div className='flex items-center flex-warp gap-3 hover:text-slate-100'>Sắp xếp theo</div>
        <Button className='capitalize bg-orange-600 text-white text-sm text-center h-8 px-4 hover:text-slate-100'>
          Phổ Biến
        </Button>
        <Button className='capitalize bg-white text-black text-sm text-center h-8 px-4 hover:text-slate-100'>
          Mới Nhất
        </Button>
        <Button className='capitalize bg-white text-black text-sm text-center h-8 px-4 hover:text-slate-100'>
          Bán Chạy
        </Button>
        <select className='capitalize bg-white text-black text-sm text-left h-8 px-4 hover:text-slate-100' value={''}>
          <option defaultValue='' disabled>
            Giá
          </option>
          <option value='price:asc'>Giá: Thấp đến cao</option>
          <option value='price:desc'>Giá: Cao đến thấp</option>
        </select>
        <div className='flex flex-warp gap-2 ml-20 items-center '>
          <div>
            <span className='text-orange-600'>1</span>
            <span>/2</span>
          </div>
          <div className='ml-2'>
            <button className='px-3 h-8 rounded-tl-sm rounded-bl-sm bg-white/60 hover:bg-slate-100 cursor-not-allowed'>
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
            </button>
            <button className='px-3 h-8 rounded-tr-sm rounded-br-sm bg-white hover:bg-slate-100 '>
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
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
