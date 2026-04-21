import React from 'react'

function Header() {
  return (
    <>
    <nav className='navbar fixed-top d-flex p-3 ps-5 pe-5'>
      <div className='d-flex align-items-center gap-5'>
        <h1>Z Lite</h1>
        <a href="" className='text-decoration-none text-info'>Home</a>
      </div>
      <div className='d-flex align-items-center gap-3'>
        <form className='form-inline d-flex gap-1'>
          <input type='' className='search-box rounded-1' placeholder='Search by username' />
          <button type='submit' className='btn btn-info rounded-1 px-2'>Search</button>
        </form>
        <a href=''><img src='/default.png' width='50px' className=' me-5 ms-3' /></a>
      </div>
    </nav>
    </>
  )
}

export default Header
