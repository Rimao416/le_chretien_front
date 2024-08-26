import React from 'react'

function Title({titre}) {
  return (
    <div className='title'>
        <p className='title__content'>{titre}</p>
        <span className="title__divider"></span>
    </div>
  )
}

export default Title
