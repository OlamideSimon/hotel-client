import React, { useEffect } from 'react'
import './Modal.css'

const Modal = ({ children }: { children: any }) => {
  useEffect((): any => {
    document.body.style.overflow = 'hide';
    
    return () => document.body.style.overflow = 'unset'
  })

  return (
    <div>
      <div className={styles.bgBlack}>
          <div className={styles.centered}>
              <div className={styles.modal}>
                  {children}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Modal

const styles = {
    bgBlack: 'w-full z-0 top-0 left-0 bottom-0 grid place-items-center absolute bg-black bg-opacity-20',
    centered: 'grid place-items-center fixed',
    modal: 'bg-white relative rounded-xl max-w-lg p-4 shadow shadow-black',
}