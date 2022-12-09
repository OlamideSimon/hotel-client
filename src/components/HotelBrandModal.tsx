import React, { FormEvent, useEffect, useState } from 'react'
import Modal from '../hoc/Modal';
import { handleError } from '../utils/error';
import { HotelBrandParams } from '../utils/interface';
import { newBrand, updateBrand } from '../utils/requests';


const HotelBrandModal = ({ handleModal, getBrands, brand }: HotelBrandParams) => {
    const [ name, setName ] = useState<string>('');
    const [{ data, error, loading }, postBrand] = newBrand()
    const [{ updateData, updateError, updateLoading }, updateBrd] = updateBrand()

    useEffect(() => {
        if (brand) {
            setName(brand?.name!)
        }
    }, [brand])

    useEffect(() => {
        if (data || updateData) {
            handleModal()
            getBrands()
        };
    }, [data, getBrands, handleModal, updateData])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(brand) {
            updateBrd({ data: { name }, url: `hotel-brands/${brand?.id}`, })
        } else {
            postBrand({data: {name}})
        }
    };

    if (error) {handleError(error)};
    if (updateError) {handleError(error)};

    return (
        <Modal>
            <p className='text-center text-slate-500 text-xl'>Add New Hotel Brand</p>
            <form onSubmit={onSubmit} className='p-2 space-y-3'>
                <input 
                    className={styles.modalInput}
                    placeholder='Name of Brand'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className='flex justify-end space-x-3'>
                    <button onClick={handleModal} className={styles.cancelBtn} disabled={loading || updateLoading}>
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

export default HotelBrandModal;

const styles = {
    modalInput: 'outline-none border rounded p-2 text-slate-500',
    saveBtn: 'bg-blue-500 text-white p-2 rounded disabled:bg-opacity-30',
    cancelBtn: 'text-red-500'
}