import { Link, useMatch } from 'react-router-dom'


export default function RegisterHeader() {
  const registerMatch = useMatch('/register')
  const isRegister = Boolean(registerMatch)
  return (
    <div>
      <header className='py-5'>
        <div className='container'>
          <nav className='flex items-end'>
            <Link to='/'>
              <img
                className='h-12 lg:h11'
                src='https://mshopgear.vn/wp-content/uploads/2020/09/Shopee-logo.png'
                alt=''
              />
            </Link>
            <div className='ml-5 mb-2 text-xl lg:text-2xl'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</div>
          </nav>
        </div>
      </header>
    </div>
  )
}
