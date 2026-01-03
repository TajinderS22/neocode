'use client'
import { store } from '@/store/store';
import React from 'react'
import { Provider } from 'react-redux'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
}

export default layout