import Header from "./components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { openModal } from "./utils/reducerFunctions";
import { useEffect, useReducer } from "react";
import HotelModal from "./components/HotelModal";
import Hotel from "./components/Hotel";
import { deleteBrand, fetchBrands } from './utils/requests'
import { handleError } from "./utils/error";
import { Brand } from "./utils/interface";
import editIcon from './assets/imgs/edit.png'
import deleteIcon from './assets/imgs/delete.png'
import HotelBrandModal from "./components/HotelBrandModal";
import Modal from "./hoc/Modal";

function App() {
  const [state, dispatch] = useReducer(openModal, {
    addHotelModal: false,
    deleteModal: false,
    editModal: false,
    brand: null,
    id: null
  })
  const [{ data, error, loading }, getBrands] = fetchBrands()
  const [{ deleteData, deleteError, deleteLoading }, deleteBrd] = deleteBrand()

  useEffect(() => {
    if (deleteData) {
      dispatchFunc('delete')
    }
  }, [deleteData])

  const dispatchFunc = (type: string, arg?: any) => {
    dispatch({ type, arg})
  }

  const onDelete = () => {
    deleteBrd({ url: `hotel-brands/${state.id}` })
  }

  if (error) {handleError(error)};
  if (deleteError) { handleError(deleteError) }

  if (loading | deleteLoading) console.log('loading...');
  return (
    <>
      <div className="">
        <ToastContainer />
        <Header getBrands={getBrands} />
        <div className={styles.brands}>
          {data?.map(({ id, name, hotels }: Brand, index: number) => (
            <div key={index} className='space-y-8'>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 w-44 sm:w-fit">
                  <p className={styles.brand}>{name}</p>
                  <img src={editIcon} alt='' className={styles.icons} onClick={() => dispatchFunc('edit-brand', {id, name})} />
                  <img src={deleteIcon} alt='' className={styles.icons} onClick={() => dispatchFunc('delete', id)} />
                </div>
                <button className={styles.addHotel} onClick={() => dispatchFunc('add-hotel', id)}>
                  Add Hotel
                </button>
              </div>

              {/* Hotel cards */}
              <div className='flex overflow-x-auto px-5 max-h-48'>
                  {hotels?.length !== 0 ? (
                      <>
                          {hotels?.map((hotel, index) => (
                              <Hotel key={index} hotel={hotel} getBrands={getBrands} />
                          ))}
                      </>
                  ): (
                      <p className={styles.emptyHotel}>
                          No Hotels Listed under brand!!
                      </p>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {state.addHotelModal && (
        <HotelModal 
          brand={state.brand} 
          getBrands={getBrands} 
          dispatchFunc={() => dispatchFunc('add-hotel')} 
        />
      )}

      {state.editModal && (
        <HotelBrandModal 
          brand={state.brand} 
          getBrands={getBrands} 
          handleModal={() => dispatchFunc('edit-brand')} 
        />
      )}

      {state.deleteModal && (
        <Modal>
          <p className={styles.deleteHeading}>Delete Hotel Brand?</p>
          <p className={styles.deleteSubheading}>This action is irreversible!</p>
          <div className={styles.buttonsDiv}>
            <button className={styles.deleteCancel} onClick={() => dispatchFunc('delete')} disabled={deleteLoading}>
              Cancel
            </button>
            <button className={styles.deleteModalBtn} onClick={onDelete} disabled={deleteLoading}>
              Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default App;

const styles = {
  addHotel: 'border-blue-500 border p-1 rounded text-sm',
  icons: 'w-4 cursor-pointer',
  brand: "font-medium text-xl truncate",
  brands: "box-border py-10 px-3 md:py-20 md:px-36 space-y-20",
  emptyHotel: 'w-full grid place-content-center text-slate-400 text-sm',
  deleteHeading: 'text-3xl text-slate-600 px-2',
  deleteSubheading: 'box-border pb-5 pt-2 text-slate-500',
  buttonsDiv: 'flex justify-end items-center space-x-4',
  deleteCancel: 'uppercase text-sm text-slate-800',
  deleteModalBtn: 'uppercase text-sm text-red-500'
}