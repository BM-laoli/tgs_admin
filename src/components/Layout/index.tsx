import React, { FC } from 'react';


const Layout = (props) => {

  return (
    <div>
      <p>title</p>
      <div>-----</div>
      <div>
        {props.children}
      </div>
    </div>
  )
}