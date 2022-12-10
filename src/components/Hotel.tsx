import React, { useEffect, useReducer } from 'react'
import Modal from '../hoc/Modal'
import { handleError } from '../utils/error'
import { GetHotel2 } from '../utils/interface'
import { openModal } from '../utils/reducerFunctions'
import { deleteHotel } from '../utils/requests'
import HotelModal from './HotelModal'

const Hotel = ({ hotel, getBrands }: GetHotel2) => {
  const [state, dispatch] = useReducer(openModal, {
    editModal: false,
    deleteModal: false,
  })
  const [{ data, loading, error }, deleteHol] = deleteHotel()

  useEffect(() => {
    if (data) {
      getBrands()
      dispatchFunc('delete')
    }
  }, [data, getBrands])

  const dispatchFunc = (type: string) => {
    dispatch({ type})
  }

  const onDelete = () => {
    deleteHol({ url: `hotel/${hotel?.id}` })
  }

  if (error) {handleError(error)}
  if (loading) console.log('Loading...')

  return (
    <>
      <div className={styles.card}>
        <div className={styles.blackBg}>
          <p className={styles.name}>{hotel?.name}</p>
          <p className={styles.cityCountry}>{`${hotel?.city}, ${hotel?.country}`}</p>
          <p className='w-full truncate'>{hotel?.address}</p>
          <div className='space-x-2 mt-4'>
            <button className={styles.editBtn} onClick={() => dispatchFunc('edit')}>
              Edit
            </button>
            <button className={styles.deleteBtn} onClick={() => dispatchFunc('delete')}>
              Delete
            </button>
          </div>
        </div>
      </div>

      {state.editModal &&  (
        <HotelModal dispatchFunc={() => dispatchFunc('edit')} hotel={hotel} getBrands={getBrands} />
      )}

      {state.deleteModal && (
        <Modal>
          <p className={styles.deleteHeading}>Delete Hotel?</p>
          <p className={styles.deleteSubheading}>This action is irreversible!</p>
          <div className={styles.buttonsDiv}>
            <button className={styles.deleteCancel} onClick={() => dispatchFunc('delete')} disabled={loading}>
              Cancel
            </button>
            <button className={styles.deleteModalBtn} onClick={onDelete} disabled={loading}>
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default Hotel

const styles = {
  blackBg: 'bg-black text-white p-5 w-full text-center h-full bg-opacity-40 rounded-xl',
  card: 'min-w-[300px] shadow-md bg-card-bg bg-cover rounded-xl mx-5',
  editBtn: 'py-1 px-3 rounded-full border hover:bg-green-500 hover:transition-all hover:duration-500 hover:border-transparent',
  deleteBtn: 'py-1 px-3 rounded-full border hover:bg-red-500 hover:transition-all hover:duration-500 hover:border-transparent',
  name: 'text-center text-2xl font-semibold mb-2 w-full truncate',
  cityCountry: 'text-lg text-slate-300 mb-5 w-full truncate',
  deleteHeading: 'text-3xl text-slate-600 px-2',
  deleteSubheading: 'box-border pb-5 pt-2 text-slate-500',
  buttonsDiv: 'flex justify-end items-center space-x-4',
  deleteCancel: 'uppercase text-sm text-slate-800 disabled:bg-opacity-30',
  deleteModalBtn: 'uppercase text-sm text-red-500 disabled:bg-opacity-30'
}