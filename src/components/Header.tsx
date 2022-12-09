import React, { useState } from 'react'
import HotelBrandModal from './HotelBrandModal';

const Header = ({ getBrands }: {getBrands: any}) => {
    const [ openModal, setOpenModal ] = useState<boolean>(false)

    const handleModal = () => {
        setOpenModal((openModal) => !openModal);
    };

    return (
        <>
            <div className={styles.container}>
                <p className={styles.logo}>Hotel Ranking</p>
                <button className={styles.brandButton} onClick={handleModal}>
                    New Brand
                </button>
            </div>

            {openModal && (
                <HotelBrandModal 
                    getBrands={getBrands}
                    handleModal={handleModal}
                />
            )}
        </>
    )
}

export default Header

const styles = {
    container: 'flex justify-between items-center px-2 md:px-20 py-5 shadow',
    logo: 'cursive text-3xl',
    brandButton: 'bg-blue-500 text-white rounded-lg p-2'
}