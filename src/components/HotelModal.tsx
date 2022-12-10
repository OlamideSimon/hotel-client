import React, { FormEvent, useEffect, useState } from 'react'
import Modal from '../hoc/Modal'
import { handleError } from '../utils/error'
import { GetHotel } from '../utils/interface'
import { newHotel, updateHotel } from '../utils/requests'

const HotelModal = ({ dispatchFunc, hotel, brand, getBrands }: GetHotel) => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    country: '',
    address: ''
  });
  const { address, city, country, name } = formData;
  const [{ error, loading, data }, addHotel ] = newHotel()
  const [{ updateError, updateLoading, updateData }, update ] = updateHotel()

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name!,
        city: hotel.city!,
        country: hotel.country!,
        address: hotel.address!
      })
    }
  }, [hotel])

  useEffect(() => {
    if (data || updateData) {
      dispatchFunc()
      getBrands()
    }
  }, [data, dispatchFunc, getBrands, updateData])

  const onChange = (e: any) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (hotel) {
      update({ data: formData, url: `hotel/${hotel.id}` })
    } else {
      addHotel({ data: {...formData, hotelBrand: brand} })
    }
  }

  if (error) {handleError(error)};
  if (updateError) {handleError(updateError)};
  if (loading || updateLoading) console.log('loading...')

  return (
    <Modal>
      <p className='text-2xl text-slate-600 text-center'>Edit Hotel</p>
      <form className='grid py-5 gap-3' onSubmit={onSubmit}>
        <input 
          placeholder='Enter Name of Hotel'
          value={name}
          name='name'
          onChange={onChange}
          className={styles.input}
        />
        <input 
          placeholder='Address'
          value={address}
          name='address'
          onChange={onChange}
          className={styles.input}
        />
        <div className='gap-2 grid grid-cols-2'>
          <input 
            placeholder='City'
            value={city}
            name='city'
            onChange={onChange}
            className={styles.input}
          />
          <input 
            placeholder='Country'
            value={country}
            name='country'
            onChange={onChange}
            className={styles.input}
          />
        </div>
        <div className='flex justify-end space-x-3'>
          <button onClick={dispatchFunc} className={styles.cancelBtn} disabled={loading || updateLoading}>
            Cancel
          </button>
          <button type='submit' className={styles.saveBtn} disabled={loading || updateLoading}>
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default HotelModal

const styles = {
  bg: 'w-full z-0 top-0 left-0 bottom-0 grid place-items-center absolute bg-black bg-opacity-20',
  center: 'grid place-items-center fixed',
  modal: 'bg-white relative rounded-xl max-w-lg p-4 shadow shadow-black',
  input: 'focus:outline-none bg-slate-100 p-2 text-slate-800',
  saveBtn: 'bg-blue-500 text-white p-2 rounded disabled:bg-opacity-30',
  cancelBtn: 'text-red-500'
}