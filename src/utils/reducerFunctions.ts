export const openModal = (state: any, action: any) => {
    switch(action.type) {
        case "edit": 
            return {
                editModal: !state.editModal,
                hotelDetails: action.arg
            }
    
        case "delete":
            return {
                deleteModal: !state.deleteModal,
                id: action.arg
            }

        case "add":
            return {
                addModal: !state.addModal,
            }

        case "add-hotel":
            return {
                addHotelModal: !state.addHotelModal,
                brand: action.arg
            }

        case "edit-brand":
            return {
                editModal: !state.editModal,
                brand: action.arg
            }
        
        default:
            return state
    }
}