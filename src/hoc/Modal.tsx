import React from 'react'

const Modal = ({ children }: { children: any }) => {
  return (
    <div className={styles.bgBlack}>
        <div className={styles.centered}>
            <div className={styles.modal}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal

const styles = {
    bgBlack: 'bg-black bg-opacity-60 w-screen h-screen z-0 top-0 left-0 grid place-items-center absolute',
    centered: 'grid place-items-center fixed',
    modal: 'bg-white relative rounded-xl max-w-lg p-4',
}