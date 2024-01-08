import React from 'react'

const Layout = ({children}) => {  
  return (
    <>
        <div className='header'>WELCOME</div>
        <div className='content'>{children}</div>
    </>
  )
}

export default Layout
