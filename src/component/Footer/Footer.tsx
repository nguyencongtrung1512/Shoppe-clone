export default function Footer() {
  return (
    <footer className='py-16 bg-neutral-100'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
          <p>Copyright &copy; 2024 Shoppe Clone</p>
          <div className='lg:col-span-2'>
            <div>
              Quốc gia & Khu vực: Singapore Indonesia Thái Lan Malaysia Việt Nam Philippines Brazil México Colombia
              Chile Đài Loan
            </div>
          </div>
        </div>
        <div className='text-center text-sm mt-10'>
          <p>Công ty TNHH Shopee</p>
          <p className='mt-6'>dự án Shoppe Clone</p>
          <p className='mt-6'>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Công Trung - Điện thoại liên hệ: 0867151203</p>
          <p className='mt-6'>&copy; - Bản quyền thuộc về Công ty TNHH Shopee</p>
          <p className='mt-6'>Cung cấp bộ dự án cho môn học không phải để fake lừa đảoooo</p>
        </div>
      </div>
    </footer>
  )
}
